import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Transaction from '../infra/typeorm/entities/Transaction';
import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import GetUserBalanceService from './GetUserBalanceService';

interface IRequest {
  user_id: string;
  description: string;
  value: number;
}

@injectable()
export default class WithdrawService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    description,
    value,
  }: IRequest): Promise<Transaction> {
    const findUser = await this.usersRepository.findByID(user_id);

    if (!findUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const getBalance = new GetUserBalanceService(
      this.transactionsRepository,
      this.usersRepository,
    );

    const balance = await getBalance.execute({ user_id });

    if (balance < Math.abs(value)) {
      throw new AppError(
        "You don't have enough funds for this transaction",
        400,
      );
    }

    const transaction = await this.transactionsRepository.create({
      user_id,
      description,
      value,
      type: 'debit',
    });

    return transaction;
  }
}
