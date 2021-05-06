import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  cpf: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, cpf }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByCPF(cpf);

    if (checkUserExists) {
      throw new AppError('CPF already in use.');
    }

    const user = await this.usersRepository.create({
      name,
      cpf,
    });

    return user;
  }
}
