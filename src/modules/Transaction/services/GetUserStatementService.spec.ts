import AppError from '@shared/errors/AppError';

import GetUserStatementService from './GetUserStatementService';

import FakeTransactionsRepository from '../repositories/fakes/FakeTransactionsRepository';
import FakeUsersRepository from '@modules/User/repositories/fakes/FakeUsersRepository';

let getStatement: GetUserStatementService;
let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('GetUserStatement', () => {
  beforeEach(async () => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    getStatement = new GetUserStatementService(
      fakeTransactionsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able get the account statement from user id', async () => {
    const newUser = await fakeUsersRepository.create({
      cpf: '123.456.789-10',
      name: 'test user',
    });

    const transaction = await fakeTransactionsRepository.create({
      user_id: newUser.id,
      description: 'test',
      type: 'credit',
      value: 50,
    });

    const userStatement = await getStatement.execute({
      user_id: newUser.id,
    });

    expect(userStatement).toEqual([transaction]);
  });

  it('should be able get the account statement from a specific day', async () => {
    const newUser = await fakeUsersRepository.create({
      cpf: '123.456.789-10',
      name: 'test user',
    });

    const transaction = await fakeTransactionsRepository.create({
      user_id: newUser.id,
      description: 'test',
      type: 'credit',
      value: 50,
    });

    const userStatement = await getStatement.execute({
      user_id: newUser.id,
      date: new Date(),
    });

    expect(userStatement).toEqual([transaction]);
  });

  it('should throw an error with non existing account', async () => {
    await expect(
      getStatement.execute({
        user_id: 'invalid_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
