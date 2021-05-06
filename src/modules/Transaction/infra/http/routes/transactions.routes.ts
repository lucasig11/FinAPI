import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import DepositsController from '../controllers/DepositsController';
import StatementsController from '../controllers/StatementsController';
import WithdrawsController from '../controllers/WithdrawsController';

const transactionsRouter = Router();

const depositsController = new DepositsController();
const statementsController = new StatementsController();
const withdrawsController = new WithdrawsController();

transactionsRouter.post(
  '/deposit',
  celebrate(
    {
      [Segments.BODY]: {
        description: Joi.string().required(),
        value: Joi.number().required().greater(0),
      },
      [Segments.HEADERS]: {
        user_id: Joi.string().uuid().required(),
      },
    },
    { allowUnknown: true },
  ),
  depositsController.create,
);

transactionsRouter.post(
  '/withdraw',
  celebrate(
    {
      [Segments.BODY]: {
        description: Joi.string().required(),
        value: Joi.number().required().greater(0),
      },
      [Segments.HEADERS]: {
        user_id: Joi.string().uuid().required(),
      },
    },
    { allowUnknown: true },
  ),
  withdrawsController.create,
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
