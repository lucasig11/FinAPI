import AppError from '@shared/errors/AppError';

import GetUserBalanceService from './GetUserBalanceService';

import FakeTransactionsRepository from '../repositories/fakes/FakeTransactionsRepository';
import FakeUsersRepository from '@modules/User/repositories/fakes/FakeUsersRepository';

let getBalance: GetUserBalanceService;
let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('GetUserStatement', () => {
  beforeEach(async () => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    getBalance = new GetUserBalanceService(
      fakeTransactionsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able get the account balance', async () => {
    const newUser = await fakeUsersRepository.create({
      cpf: '123.456.789-10',
      name: 'test user',
    });

    await fakeTransactionsRepository.create({
      user_id: newUser.id,
      description: 'test',
      type: 'credit',
      value: 50,
    });

    await fakeTransactionsRepository.create({
      user_id: newUser.id,
      description: 'test2',
      type: 'credit',
      value: 500,
    });

    const balance = await getBalance.execute({
      user_id: newUser.id,
    });

    expect(balance).toEqual(550);
  });

  it('should throw an error with non existing account', async () => {
    await expect(
      getBalance.execute({
        user_id: '4f23faaa-6e7e-4ff5-a6d6-3ed76092afb5',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
