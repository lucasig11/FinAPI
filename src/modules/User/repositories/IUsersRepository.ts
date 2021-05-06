import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findByID(ID: string): Promise<User | undefined>;
  findByCPF(CPF: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  delete(user_id: string): Promise<void>;
}
