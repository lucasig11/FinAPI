import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import DepositsController from '../controllers/DepositsController';

const transactionsRouter = Router();

const depositsController = new DepositsController();

transactionsRouter.post(
  '/deposit',
  celebrate(
    {
      [Segments.BODY]: {
        description: Joi.string().required(),
        value: Joi.number().required(),
      },
      [Segments.HEADERS]: {
        user_id: Joi.string().uuid().required(),
      },
    },
    { allowUnknown: true },
  ),
  depositsController.create,
);

export default transactionsRouter;
