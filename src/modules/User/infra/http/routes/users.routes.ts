import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.string()
        .required()
        .regex(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/),
    },
  }),
  usersController.create,
);

export default usersRouter;
