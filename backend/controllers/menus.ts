import { Request, Response, Router } from 'express';
import humps from 'humps';
import * as config from '../utils/config';
import * as menus from '../models/menus';

const router = Router();

/*
 *
 * PRODUCTION
 *
 */

// show all list of menus or search
router.get('/', async (request: Request, response: Response) => {
  try {
    let res;
    if (request.query.name) res = await menus.getByName(request.query.name as string);
    else res = await menus.getAll();
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// show a menu with all its foods
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const res = await menus.getById(id);
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// create a menu
router.post('/', async (request: Request, response: Response) => {
  try {
    const res = await menus.add(request.body);
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// update simple details of a menu
router.put('/', async (request: Request, response: Response) => {
  try {
    const res = await menus.update(request.body);
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// delete a menu
router.delete('/:id', async (request: Request, response: Response) => {
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
  router.delete('/', async (request: Request, response: Response) => {
    try {
      const res = await menus.deleteAll();
      response.status(200).send(humps.camelizeKeys(res));
    } catch (err) {
      response.status(500).send(err);
    }
  });
}

export default router;
