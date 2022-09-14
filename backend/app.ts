import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import * as middleware from './utils/middleware';
import * as config from './utils/config';

import testingRouter from './controllers/testing';
import usersRouter from './controllers/users';
import foodsRouter from './controllers/foods';
import menusRouter from './controllers/menus';
import menuFoodsRouter from './controllers/menuFoods';

const app: Express = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: config.SECRET_KEY as string, resave: true, saveUninitialized: true }));
app.use(middleware.postgreSQLHeaders);
app.use(middleware.getUser);

if (config.MODE === 'testing') app.use('/api/testing', testingRouter);

app.use('/api/users', usersRouter);
app.use('/api/foods', foodsRouter);
app.use('/api/menus', menusRouter);
app.use('/api/menu_foods', menuFoodsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
