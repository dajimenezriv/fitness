/* eslint object-curly-newline: off */
/* eslint no-unused-vars: off */
/* eslint @typescript-eslint/no-unused-vars: off */

import { Request, Response, Router } from 'express';
import * as menuFoods from '../models/menuFoods';
import * as menus from '../models/menus';
import * as foods from '../models/foods';
import * as users from '../models/users';

const router = Router();

router.get('/deleteAll', async (request: Request, response: Response) => {
  try {
    menuFoods.deleteAll();
    menus.deleteAll();
    foods.deleteAll();
    users.deleteAll();
    response.status(200).send();
  } catch (err) {
    response.status(500).send(err);
  }
});

export default router;
