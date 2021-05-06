import AppError from '@shared/errors/AppError';

import DeleteUserService from './DeleteUserService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeTransactionsRepository from '@modules/Transaction/repositories/fakes/FakeTransactionsRepository';

let deleteUser: DeleteUserService;
let fakeUsersRepository: FakeUsersRepository;
let fakeTransactionsRepository: FakeTransactionsRepository;

describe('DeleteUser', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTransactionsRepository = new FakeTransactionsRepository();

    deleteUser = new DeleteUserService(
      fakeTransactionsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to delete the user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas',
      cpf: '153.381.787-10',
    });

    await deleteUser.execute({
      id: user.id,
    });

    await expect(fakeUsersRepository.findByID(user.id)).resolves.toBe(
      undefined,
    );
  });

  it('should throw an error on invalid user id', async () => {
    await expect(
      deleteUser.execute({
        id: 'invalid_id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      deleteUser.execute({
        id: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete account with negative balance', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas',
      cpf: '153.381.787-10',
    });

    await fakeTransactionsRepository.create({
      user_id: user.id,
      description: 'test',
      type: 'debit',
      value: -50,
    });

    await expect(
      deleteUser.execute({
        id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
