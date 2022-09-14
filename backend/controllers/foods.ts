import { Request, Response, Router } from 'express';
import humps from 'humps';
import * as config from '../utils/config';
import * as foods from '../models/foods';

const router = Router();

/*
 *
 * PRODUCTION
 *
 */

// show all list of foods or search
router.get('/', async (request: Request, response: Response) => {
  try {
    let res;
    if (request.query.name) res = await foods.getByName(request.query.name as string);
    else res = await foods.getAll();
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// show full details of a food
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const res = await foods.getById(id);
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// create a food
router.post('/', async (request: Request, response: Response) => {
  try {
    const res = await foods.add(request.body);
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// update details of a food
router.put('/', async (request: Request, response: Response) => {
  try {
    const res = await foods.update(request.body);
    response.status(200).send(humps.camelizeKeys(res));
  } catch (err) {
    response.status(500).send(err);
  }
});

// delete a food
router.delete('/:id', async (request: Request, response: Response) => {
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
  router.delete('/', async (request: Request, response: Response) => {
    try {
      const res = await foods.deleteAll();
      response.status(200).send(humps.camelizeKeys(res));
    } catch (err) {
      response.status(500).send(err);
    }
  });
}

export default router;
