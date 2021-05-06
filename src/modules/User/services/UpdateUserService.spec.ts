import AppError from '@shared/errors/AppError';

import UpdateUserService from './UpdateUserService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let updateUser: UpdateUserService;
let fakeUsersRepository: FakeUsersRepository;

describe('UpdateUser', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    updateUser = new UpdateUserService(fakeUsersRepository);
  });

  it('should be able to update the user name', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas',
      cpf: '153.381.787-10',
    });

    await updateUser.execute({
      id: user.id,
      name: 'new name',
    });

    const modified = await fakeUsersRepository.findByID(user.id);
    expect(modified).toHaveProperty('name', 'new name');
  });

  it('should throw an error on invalid user id', async () => {
    await expect(
      updateUser.execute({
        id: 'invalid_id',
        name: 'Lucas',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      updateUser.execute({
        id: undefined,
        name: 'Lucas',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
