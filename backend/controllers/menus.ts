import * as express from 'express';

export {};

const humps = require('humps');
const config = require('../utils/config');
const menus = require('../models/menus');

const router = express.Router();

/*
 *
 * PRODUCTION
 *
 */

// show all list of menus or search
router.get('/', async (request: express.Request, response: express.Response) => {
  try {
    let res;
    if (request.query.name) res = await menus.search(request.query.name);
    else res = await menus.getAll();
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// show a menu with all its foods
router.get('/:id', async (request: express.Request, response: express.Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const res = await menus.getById(id);
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// create a menu
router.post('/', async (request: express.Request, response: express.Response) => {
  try {
    const res = await menus.add(request.body);
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// update simple details of a menu
router.put('/', async (request: express.Request, response: express.Response) => {
  try {
    const res = await menus.update(request.body);
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// delete a menu
router.delete('/:id', async (request: express.Request, response: express.Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const res = await menus.deleteById(id);
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
  // delete all menus
  router.delete('/', async (request: express.Request, response: express.Response) => {
    try {
      const res = await menus.deleteAll();
      response.status(200).send(humps.camelizeKeys(res));
    } catch (err) {
      response.status(500).send(err);
    }
  });
}

module.exports = router;
