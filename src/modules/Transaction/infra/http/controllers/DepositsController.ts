import { container } from 'tsyringe';
import { Request, Response } from 'express';

import DepositService from '@modules/Transaction/services/DepositService';
import AppError from '@shared/errors/AppError';

export default class DepositsController {
  public async create(request: Request, response: Response) {
    const { value, description } = request.body;
    const user_id = request.header('user_id');

    if (!user_id) {
      throw new AppError('Invalid user id');
    }

    const deposit = container.resolve(DepositService);

    const transaction = await deposit.execute({
      user_id,
      value,
      description,
    });

    return response.status(201).json(transaction);
  }
}
