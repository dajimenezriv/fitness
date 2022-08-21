import * as express from 'express';

export {};

const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const middleware = require('./utils/middleware');
const config = require('./utils/config');

const testingRouter = require('./controllers/testing');
const usersRouter = require('./controllers/users');
const foodsRouter = require('./controllers/foods');
const menusRouter = require('./controllers/menus');
const menuFoodsRouter = require('./controllers/menuFoods');

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: config.SECRET_KEY }));
app.use(middleware.postgreSQLHeaders);
app.use(middleware.getUser);

if (config.MODE === 'testing') app.use('/api/testing', testingRouter);

app.use('/api/users', usersRouter);
app.use('/api/foods', foodsRouter);
app.use('/api/menus', menusRouter);
app.use('/api/menu_foods', menuFoodsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
