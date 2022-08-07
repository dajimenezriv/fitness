import * as express from 'express';

export {};

const menuFoods = require('../models/menuFoods');

const router = express.Router();

/*
 *
 * PRODUCTION
 *
 */

// show all menu foods (simple details)
router.get('/:menuId/foods', async (request: express.Request, response: express.Response) => {
  try {
    const menuId = parseInt(request.params.menuId, 10);
    const res = await menuFoods.getByMenuId(menuId);
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

// show a menu foods (full details)
router.get('/:menuId/foods/:id', async (request: express.Request, response: express.Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const res = await menuFoods.getById(id);
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

// create a menu food
router.post('/:menuId/foods', async (request: express.Request, response: express.Response) => {
  try {
    const res = await menuFoods.add(request.body);
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

// update a menu food
router.put('/:menuId/foods', async (request: express.Request, response: express.Response) => {
  try {
    const res = await menuFoods.update(request.body);
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

// delete a menu food
router.delete('/:menuId/foods/:id', async (request: express.Request, response: express.Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const res = await menuFoods.deleteById(id);
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
