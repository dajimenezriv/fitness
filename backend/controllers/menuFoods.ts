import { Request, Response, Router } from 'express';
import humps from 'humps';
import * as config from '../utils/config';
import * as menuFoods from '../models/menuFoods';

const router = Router();

/*
 *
 * PRODUCTION
 *
 */

// show all menu foods (simple details)
router.get('/', async (request: Request, response: Response) => {
  try {
    const res = await menuFoods.getByMenuId(parseInt(request.query.menu_id as string, 10));
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// show a menu foods (full details)
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const res = await menuFoods.getById(id);
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// create a menu food
router.post('/', async (request: Request, response: Response) => {
  try {
    const res = await menuFoods.add(request.body);
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// update a menu food
router.put('/', async (request: Request, response: Response) => {
  try {
    const res = await menuFoods.update(request.body);
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// delete a menu food
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const res = await menuFoods.deleteById(id);
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
  router.delete('/', async (request: Request, response: Response) => {
    try {
      const res = await menuFoods.deleteAll();
      response.status(200).send(humps.camelizeKeys(res));
    } catch (err) {
      response.status(500).send(err);
    }
  });
}

export default router;
