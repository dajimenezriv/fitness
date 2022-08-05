import * as express from 'express';

export {};

const foods = require('../models/foods');
const menus = require('../models/menus');

const router = express.Router();

router.get('/', async (request: express.Request, response: express.Response) => {
  try {
    foods.deleteAll();
    foods.add({ name: 'Banana', market: 'Mercadona', carbs: 23, proteins: 12, fats: 0.5 });
    foods.add({ name: 'Arroz', market: 'Mercadona', carbs: 60, proteins: 6, fats: 0.001 });
    foods.add({ name: 'Macarrones', market: 'Mercadona', carbs: 68, proteins: 7, fats: 0.0002 });
    response.status(200).send();
  } catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
