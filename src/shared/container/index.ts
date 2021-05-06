import { container } from 'tsyringe';

import UsersRepository from '@modules/User/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/User/repositories/IUsersRepository';

import TransactionsRepository from '@modules/Transaction/infra/typeorm/repositories/TransactionsRepository';
import ITransactionsRepository from '@modules/Transaction/repositories/ITransactionsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);
