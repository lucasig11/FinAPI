import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let createUser: CreateUserService;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateUser', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    createUser = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Lucas',
      cpf: '123.456.789-10',
    });

    expect(user).toHaveProperty('id');
  });

  it('should throw error on cpf collision', async () => {
    const cpf = '123.456.789-10';

    await createUser.execute({
      name: 'Lucas',
      cpf,
    });

    await expect(
      createUser.execute({
        name: 'Lucas',
        cpf,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
