/* eslint object-curly-newline: off */
/* eslint no-unused-vars: off */
/* eslint @typescript-eslint/no-unused-vars: off */

import * as express from 'express';

export {};

const menuFoods = require('../models/menuFoods');
const menus = require('../models/menus');
const foods = require('../models/foods');

const router = express.Router();

router.get('/', async (request: express.Request, response: express.Response) => {
  try {
    menuFoods.deleteAll();
    menus.deleteAll();
    foods.deleteAll();
    const menu1 = await menus.add({ name: 'Déficit', numberOfMeals: 3 });
    const food1 = await foods.add({ name: 'Banana', market: 'Mercadona', calories: 92, carbs: 23, proteins: 12, fats: 0.5 });
    const food2 = await foods.add({ name: 'Arroz', market: 'Mercadona', calories: 350, carbs: 60, proteins: 6, fats: 0.001 });
    const food3 = await foods.add({ name: 'Macarrones', market: 'Mercadona', calories: 186, carbs: 68, proteins: 7, fats: 0.0002 });
    const menuFood1 = await menuFoods.add({ menuId: menu1.id, foodId: food1.id, quantity: 125, mealNumber: 0 });
    const menuFood2 = await menuFoods.add({ menuId: menu1.id, foodId: food1.id, quantity: 75, mealNumber: 1 });
    const menuFood3 = await menuFoods.add({ menuId: menu1.id, foodId: food2.id, quantity: 150, mealNumber: 0 });
    response.status(200).send();
  } catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
