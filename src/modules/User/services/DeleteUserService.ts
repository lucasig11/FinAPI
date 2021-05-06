import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import ITransactionsRepository from '@modules/Transaction/repositories/ITransactionsRepository';
import GetUserBalanceService from '@modules/Transaction/services/GetUserBalanceService';

interface IRequest {
  id?: string;
}

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    if (!id) {
      throw new AppError('Invalid id.', 400);
    }

    const user = await this.usersRepository.findByID(id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const getBalance = new GetUserBalanceService(
      this.transactionsRepository,
      this.usersRepository,
    );

    const balance = await getBalance.execute({ user_id: id });

    if (balance < 0) {
      throw new AppError(
        "You can't delete your account with a negative balance",
        403,
      );
    }

    await this.usersRepository.delete(id);
  }
}
