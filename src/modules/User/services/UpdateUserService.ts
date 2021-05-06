import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  id?: string;
  name: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<User> {
    if (!id) {
      throw new AppError('User not found.', 404);
    }

    const user = await this.usersRepository.findByID(id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    user.name = name;

    await this.usersRepository.save(user);

    return user;
  }
}
