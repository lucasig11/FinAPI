import AppError from '@shared/errors/AppError';

import WithdrawService from './WithdrawService';

import FakeTransactionsRepository from '../repositories/fakes/FakeTransactionsRepository';
import FakeUsersRepository from '@modules/User/repositories/fakes/FakeUsersRepository';

let withdraw: WithdrawService;
let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('Withdraw', () => {
  beforeEach(async () => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    withdraw = new WithdrawService(
      fakeTransactionsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to withdraw from account', async () => {
    const newUser = await fakeUsersRepository.create({
      cpf: '123.456.789-10',
      name: 'test user',
    });

    await fakeTransactionsRepository.create({
      user_id: newUser.id,
      value: 500,
      description: 'test deposit',
      type: 'credit',
    });

    const transaction = await withdraw.execute({
      user_id: newUser.id,
      value: 50,
      description: 'test withdraw',
    });

    expect(transaction).toHaveProperty('value', -50);
  });

  it('should not be able to withdraw from non existing account', async () => {
    await expect(
      withdraw.execute({
        user_id: 'invalid_id',
        value: 50,
        description: 'test withdraw',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to withdraw without enough funds', async () => {
    const newUser = await fakeUsersRepository.create({
      cpf: '123.456.789-10',
      name: 'test user',
    });

    await expect(
      withdraw.execute({
        user_id: newUser.id,
        value: 50,
        description: 'test withdraw',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
