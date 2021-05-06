import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/User/services/CreateUserService';
import UpdateUserService from '@modules/User/services/UpdateUserService';
import { validate } from 'uuid';
import AppError from '@shared/errors/AppError';

export default class UsersControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      cpf,
    });

    return response.status(201).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      body: { name },
      query: { id },
    } = request;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      name,
      id: id?.toString(),
    });

    return response.status(201).json(user);
  }
}
