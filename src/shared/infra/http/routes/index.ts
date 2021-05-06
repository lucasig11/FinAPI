import { Router } from 'express';

import usersRouter from '@modules/User/infra/http/routes/users.routes';

import transactionsRouter from '@modules/Transaction/infra/http/routes/transactions.routes';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/transaction', transactionsRouter);

export default routes;
