import { getRepository, Repository } from 'typeorm';
import { isSameDay } from 'date-fns';

import Transaction from '../entities/Transaction';
import ITransactionsRepository from '@modules/Transaction/repositories/ITransactionsRepository';
import IFindByDateDTO from '@modules/Transaction/dtos/IFindByDateDTO';
import ICreateTransactionDTO from '@modules/Transaction/dtos/ICreateTransactionDTO';

export default class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async findByDate({
    user_id,
    date,
  }: IFindByDateDTO): Promise<Transaction[]> {
    const transactions = await this.ormRepository.find({
      where: { user_id },
    });

    return transactions.filter(t => isSameDay(t.created_at, date));
  }

  public async findByUser(user_id: string): Promise<Transaction[]> {
    const transactions = this.ormRepository.find({
      where: { user_id },
    });

    return transactions;
  }

  public async create({
    value,
    type,
    ...rest
  }: ICreateTransactionDTO): Promise<Transaction> {
    value = Math.abs(value);

    const transaction = this.ormRepository.create({
      type,
      value: type === 'credit' ? value : -value,
      ...rest,
    });

    await this.ormRepository.save(transaction);

    return transaction;
  }
}
