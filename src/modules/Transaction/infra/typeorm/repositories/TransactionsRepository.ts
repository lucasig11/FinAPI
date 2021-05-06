import { getRepository, Repository } from 'typeorm';

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
    const transactions = this.ormRepository.find({
      where: { user_id, created_at: date },
    });

    return transactions;
  }

  public async findByUser(user_id: string): Promise<Transaction[]> {
    const transactions = this.ormRepository.find({
      where: { user_id },
    });

    return transactions;
  }

  public async create(data: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.ormRepository.create(data);

    await this.ormRepository.save(transaction);

    return transaction;
  }
}