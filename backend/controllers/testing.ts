import * as express from 'express';

export {};

const foods = require('../models/foods');
const menus = require('../models/menus');
const menuFoods = require('../models/menuFoods');

const router = express.Router();

router.get('/', async (request: express.Request, response: express.Response) => {
  try {
    menus.deleteAll();
    foods.deleteAll();
    const menu1 = await menus.add({ name: 'Déficit', numberOfMeals: 3 });
    const food1 = await foods.add({ name: 'Banana', market: 'Mercadona', carbs: 23, proteins: 12, fats: 0.5 });
    const food2 = await foods.add({ name: 'Arroz', market: 'Mercadona', carbs: 60, proteins: 6, fats: 0.001 });
    const food3 = await foods.add({ name: 'Macarrones', market: 'Mercadona', carbs: 68, proteins: 7, fats: 0.0002 });
    const menuFood1 = await menuFoods.add({ menuId: menu1.id, foodId: food1.id, quantity: 125, mealNumber: 0 });
    const menuFood2 = await menuFoods.add({ menuId: menu1.id, foodId: food1.id, quantity: 75, mealNumber: 1 });
    const menuFood3 = await menuFoods.add({ menuId: menu1.id, foodId: food2.id, quantity: 150, mealNumber: 0 });
    response.status(200).send();
  } catch (err) {
    console.log(err);
    response.status(500).send(err);
  }
});

module.exports = router;
