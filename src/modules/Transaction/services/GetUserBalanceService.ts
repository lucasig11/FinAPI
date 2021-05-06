import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class GetUserBalanceService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Number> {
    const findUser = await this.usersRepository.findByID(user_id);

    if (!findUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const transactions = await this.transactionsRepository.findByUser(user_id);

    const balance = transactions.reduce(
      (sum, { value }: { value: number }) => sum + value,
      0,
    );

    return balance;
  }
}
