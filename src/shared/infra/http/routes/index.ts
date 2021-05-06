import { Router } from 'express';

import usersRouter from '@modules/User/infra/http/routes/users.routes';

const routes = Router();

routes.use('/user', usersRouter);

export default routes;
