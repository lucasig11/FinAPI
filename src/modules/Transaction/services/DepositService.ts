import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  user_id: string;
  description: string;
  amount: number;
}

@injectable()
export default class DepositService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    description,
    amount,
  }: IRequest): Promise<Transaction> {
    const findUser = await this.usersRepository.findByID(user_id);

    if (!findUser) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const transaction = await this.transactionsRepository.create({
      user_id,
      description,
      amount,
      type: 'credit',
    });

    return transaction;
  }
}
