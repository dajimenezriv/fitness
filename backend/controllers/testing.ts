import * as express from 'express';
export {};
const foods = require('../models/foods');
const menus = require('../models/menus');

const router = express.Router();

router.get(
  '/',
  async (request: express.Request, response: express.Response) => {
    try {
      foods.deleteAll();
      foods.add({
        name: 'Banana',
        market: 'Mercadona',
        carbs: 23,
        proteins: 12,
        fats: 2,
      });
      response.status(200).send();
    } catch (err) {
      response.status(500).send(err);
    }
  }
);

module.exports = router;
