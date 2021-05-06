import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Transaction from '../infra/typeorm/entities/Transaction';
import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class GetUserStatementService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Transaction[]> {
    const findUser = await this.usersRepository.findByID(user_id);

    if (!findUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const transactions = await this.transactionsRepository.findByUser(user_id);

    return transactions;
  }
}
