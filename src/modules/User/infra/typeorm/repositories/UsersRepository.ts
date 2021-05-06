import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/User/dtos/ICreateUserDTO';

import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByID(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(id);

    return findUser;
  }

  public async findByCPF(cpf: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { cpf },
    });

    return findUser;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(user_id: string): Promise<void> {
    await this.ormRepository.delete(user_id);
  }
}
