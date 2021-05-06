import { container } from 'tsyringe';
import { Request, Response } from 'express';

import WithdrawService from '@modules/Transaction/services/WithdrawService';
import AppError from '@shared/errors/AppError';

export default class WithdrawsController {
  public async create(request: Request, response: Response) {
    const { value, description } = request.body;
    const user_id = request.header('user_id');

    if (!user_id) {
      throw new AppError('Invalid user id');
    }

    const withdraw = container.resolve(WithdrawService);

    const transaction = await withdraw.execute({
      user_id,
      value,
      description,
    });

    return response.status(201).json(transaction);
  }
}
