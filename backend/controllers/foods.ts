import * as express from 'express';

export {};

const humps = require('humps');
const config = require('../utils/config');
const foods = require('../models/foods');

const router = express.Router();

/*
 *
 * PRODUCTION
 *
 */

// show all list of foods or search
router.get('/', async (request: express.Request, response: express.Response) => {
  try {
    let res;
    if (request.query.name) res = await foods.search(request.query.name);
    else res = await foods.getAll();
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// show full details of a food
router.get('/:id', async (request: express.Request, response: express.Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const res = await foods.getById(id);
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// create a food
router.post('/', async (request: express.Request, response: express.Response) => {
  try {
    const res = await foods.add(request.body);
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// update details of a food
router.put('/', async (request: express.Request, response: express.Response) => {
  try {
    const res = await foods.update(request.body);
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// delete a food
router.delete('/:id', async (request: express.Request, response: express.Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const res = await foods.deleteById(id);
    response.status(200).send(humps.camelizeKeys(res));
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
  // delete all food
  router.delete('/', async (request: express.Request, response: express.Response) => {
    try {
      const res = await foods.deleteAll();
      response.status(200).send(humps.camelizeKeys(res));
    } catch (err) {
      response.status(500).send(err);
    }
  });
}

module.exports = router;
