import { v4 } from 'uuid';

import Transaction from '../../infra/typeorm/entities/Transaction';

import ITransactionsRepository from '../ITransactionsRepository';
import ICreateTransactionDTO from '../../dtos/ICreateTransactionDTO';
import IFindByDateDTO from '@modules/Transaction/dtos/IFindByDateDTO';

export default class FakeTransactionsRepository
  implements ITransactionsRepository {
  private transactionsRepository: Transaction[] = [];

  public async findByDate({
    user_id,
    date,
  }: IFindByDateDTO): Promise<Transaction[]> {
    const user = this.transactionsRepository.filter(
      transaction =>
        transaction.user_id === user_id && transaction.created_at === date,
    );

    return user;
  }

  public async findByUser(user_id: string): Promise<Transaction[]> {
    const user = this.transactionsRepository.filter(
      transaction => transaction.user_id === user_id,
    );

    return user;
  }

  public async create({
    user_id,
    amount,
    type,
    description,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = new Transaction();
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    Object.assign(transaction, {
      id: v4(),
      user_id,
      created_at: date,
      amount,
      type,
      description,
    });

    this.transactionsRepository.push(transaction);

    return transaction;
  }
}
