import * as express from 'express';

export {};

const cors = require('cors');
const middleware = require('./utils/middleware');
const testingRouter = require('./controllers/testing');
const foodsRouter = require('./controllers/foods');
const menusRouter = require('./controllers/menus');
const menuFoodsRouter = require('./controllers/menuFoods');
const config = require('./utils/config');

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.postgreSQLHeaders);

if (config.MODE === 'testing') app.use('/api/testing', testingRouter);

app.use('/api/foods', foodsRouter);
app.use('/api/menus', menusRouter);
app.use('/api/menu_foods', menuFoodsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
