import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AppError from '@shared/errors/AppError';
import GetUserStatementService from '@modules/Transaction/services/GetUserStatementService';
import GetUserBalanceService from '@modules/Transaction/services/GetUserBalanceService';

export default class StatementsController {
  public async index(request: Request, response: Response) {
    const user_id = request.header('user_id');
    const { date } = request.body;

    if (!user_id) {
      throw new AppError('Invalid user id');
    }

    const statements = container.resolve(GetUserStatementService);

    if (date) {
      const transactionsDate = new Date(date + ' 00:00');
      const transactions = await statements.execute({
        user_id,
        date: transactionsDate,
      });

      return response.status(200).json(transactions);
    }

    const transactions = await statements.execute({
      user_id,
    });

    return response.status(200).json(transactions);
  }

  public async show(request: Request, response: Response) {
    const user_id = request.header('user_id');

    if (!user_id) {
      throw new AppError('Invalid user id');
    }

    const getUserBalance = container.resolve(GetUserBalanceService);

    const balance = await getUserBalance.execute({
      user_id,
    });

    return response.status(200).json({ balance, isInDebt: balance < 0 });
  }
}
