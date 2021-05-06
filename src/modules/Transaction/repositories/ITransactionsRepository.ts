import Transaction from '../infra/typeorm/entities/Transaction';

import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import IFindByDateDTO from '../dtos/IFindByDateDTO';

export default interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  findByDate(data: IFindByDateDTO): Promise<Transaction[]>;
  findByUser(user_id: string): Promise<Transaction[]>;
}
