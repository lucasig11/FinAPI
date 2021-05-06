import { container } from 'tsyringe';
import { Request, Response } from 'express';

import GetUserStatementService from '@modules/Transaction/services/GetUserStatementService';
import AppError from '@shared/errors/AppError';

export default class StatementsController {
  public async index(request: Request, response: Response) {
    const user_id = request.header('user_id');

    if (!user_id) {
      throw new AppError('Invalid user id');
    }

    const statements = container.resolve(GetUserStatementService);

    const transactions = await statements.execute({
      user_id,
    });

    return response.status(200).json(transactions);
  }
}
