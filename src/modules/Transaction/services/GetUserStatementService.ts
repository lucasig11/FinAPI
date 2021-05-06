import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Transaction from '../infra/typeorm/entities/Transaction';
import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  user_id: string;
  date?: Date;
}

@injectable()
export default class GetUserStatementService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, date }: IRequest): Promise<Transaction[]> {
    const findUser = await this.usersRepository.findByID(user_id);

    if (!findUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    let transactions: Transaction[];

    if (date) {
      transactions = await this.transactionsRepository.findByDate({
        user_id,
        date,
      });

      return transactions;
    }

    transactions = await this.transactionsRepository.findByUser(user_id);

    return transactions;
  }
}
