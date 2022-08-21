/* eslint object-curly-newline: off */
/* eslint no-unused-vars: off */
/* eslint @typescript-eslint/no-unused-vars: off */

import * as express from 'express';

export {};

const menuFoods = require('../models/menuFoods');
const menus = require('../models/menus');
const foods = require('../models/foods');
const users = require('../models/users');

const router = express.Router();

router.get('/deleteAll', async (request: express.Request, response: express.Response) => {
  try {
    menuFoods.deleteAll();
    menus.deleteAll();
    foods.deleteAll();
    users.deleteAll();
    response.status(200).send();
  } catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
