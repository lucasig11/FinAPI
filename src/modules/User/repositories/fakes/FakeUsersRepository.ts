import { v4 } from 'uuid';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
  private usersRepository: User[] = [];

  public async findByID(id: string): Promise<User | undefined> {
    const user = this.usersRepository.find(user => user.id === id);

    return user;
  }

  public async findByCPF(cpf: string): Promise<User | undefined> {
    const user = this.usersRepository.find(user => user.cpf === cpf);

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4() }, userData);

    this.usersRepository.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const index = this.usersRepository.findIndex(
      findUser => findUser.id === user.id,
    );

    this.usersRepository[index] = user;

    return user;
  }

  public async delete(user_id: string): Promise<void> {
    this.usersRepository = this.usersRepository.filter(
      user => user.id !== user_id,
    );
  }
}
