import { v4 } from 'uuid';
import { isSameDay } from 'date-fns';
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
        transaction.user_id === user_id &&
        isSameDay(transaction.created_at, date),
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
    value,
    type,
    description,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = new Transaction();
    const date = new Date();

    Object.assign(transaction, {
      id: v4(),
      user_id,
      created_at: date,
      value,
      type,
      description,
    });

    this.transactionsRepository.push(transaction);

    return transaction;
  }
}
