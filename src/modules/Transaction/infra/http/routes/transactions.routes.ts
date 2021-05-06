import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import DepositsController from '../controllers/DepositsController';
import StatementsController from '../controllers/StatementsController';

const transactionsRouter = Router();

const depositsController = new DepositsController();
const statementsController = new StatementsController();

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

transactionsRouter.get(
  '/statement',
  celebrate(
    {
      [Segments.HEADERS]: {
        user_id: Joi.string().uuid().required(),
      },
    },
    { allowUnknown: true },
  ),
  statementsController.index,
);

transactionsRouter.get(
  '/balance',
  celebrate(
    {
      [Segments.HEADERS]: {
        user_id: Joi.string().uuid().required(),
      },
    },
    { allowUnknown: true },
  ),
  statementsController.show,
);

export default transactionsRouter;
