import * as express from 'express';

export {};

const config = require('../utils/config');
const menus = require('../models/menus');

const router = express.Router();

/*
 *
 * PRODUCTION
 *
 */

// show all menus (simple details)
router.get('/', async (request: express.Request, response: express.Response) => {
  try {
    const res = await menus.getAll();
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

// show a menu with all its foods
router.get('/:id', async (request: express.Request, response: express.Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const res = await menus.getById(id);
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

// create a menu
router.post('/', async (request: express.Request, response: express.Response) => {
  try {
    const res = await menus.add(request.body);
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

// add a food inside a menu
router.post('/:id', async (request: express.Request, response: express.Response) => {
  try {
    const res = await menus.addFood(request.body);
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

// update simple details of a menu
router.put('/', async (request: express.Request, response: express.Response) => {
  try {
    const res = await menus.update(request.body);
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

// update a food inside a menu
router.put('/:id', async (request: express.Request, response: express.Response) => {
  try {
    const res = await menus.updateFood(request.body);
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

// delete a menu
router.delete('/:id', async (request: express.Request, response: express.Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const res = await menus.deleteById(id);
    response.status(200).send(res);
  } catch (err) {
    response.status(500).send(err);
  }
});

/*
 *
 * TESTING
 *
 */

if (config.MODE === 'testing') {
  // delete all menus
  router.delete('/', async (request: express.Request, response: express.Response) => {
    try {
      const res = await menus.deleteAll();
      response.status(200).send(res);
    } catch (err) {
      response.status(500).send(err);
    }
  });
}

module.exports = router;
