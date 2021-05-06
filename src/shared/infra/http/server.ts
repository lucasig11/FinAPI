import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';

import express from 'express';
import { errors } from 'celebrate';

import routes from '../http/routes';

import errorFallback from './middlewares/errorFallback';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());
app.use(errorFallback);

app.listen(3333, () => console.log('server started'));
