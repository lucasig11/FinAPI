import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/User/services/CreateUserService';

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
}
