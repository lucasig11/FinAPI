import AppError from '@shared/errors/AppError';

import DepositService from './DepositService';

import FakeTransactionsRepository from '../repositories/fakes/FakeTransactionsRepository';
import FakeUsersRepository from '@modules/User/repositories/fakes/FakeUsersRepository';

let deposit: DepositService;
let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('Deposit', () => {
  beforeEach(async () => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    deposit = new DepositService(
      fakeTransactionsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to make a deposit', async () => {
    const newUser = await fakeUsersRepository.create({
      cpf: '123.456.789-10',
      name: 'test user',
    });

    const transaction = await deposit.execute({
      user_id: newUser.id,
      amount: 500,
      description: 'test deposit',
    });

    const userStatement = await fakeTransactionsRepository.findByUser(
      newUser.id,
    );
    expect(userStatement).toEqual([transaction]);
  });

  it('should not be able to deposit with a non existing account', async () => {
    await expect(
      deposit.execute({
        user_id: 'invalid_id',
        amount: 500,
        description: 'test deposit',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
