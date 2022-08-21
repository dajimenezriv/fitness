import * as express from 'express';

export {};

const humps = require('humps');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const users = require('../models/users');

const router = express.Router();
const saltRounds = 10;

// now, request.session.user exists
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any }; // eslint-disable-line
  }
}

/*
 *
 * PRODUCTION
 *
 */

// get users
router.get('/', async (request: express.Request, response: express.Response) => {
  try {
    let user;
    const { name } = request.query;
    if (name) user = await users.getByName(name);
    else user = await users.getAll();
    response.status(200).send(humps.camelizeKeys(user));
  } catch (err) {
    response.status(500).send(err);
  }
});

// returns logged user
router.get('/logged', async (request: express.Request, response: express.Response) => {
  try {
    const { user } = request.session;
    if (user) response.status(200).send(humps.camelizeKeys(user));
    else response.sendStatus(403);
  } catch (err) {
    response.status(500).send(err);
  }
});

router.post('/register', async (request: express.Request, response: express.Response) => {
  try {
    let user;
    const { username, email, password } = request.body;
    user = await users.getByName(username);

    // username doesn't exist
    if (user === undefined) {
      const hash = await bcrypt.hash(password, saltRounds);
      user = await users.add({ username, email, password: hash });
      const token = await jwt.sign({ user }, config.SECRET_KEY, { expiresIn: '2h' });
      response.status(200).send({ token, username });
    } else {
      // username exists
      response.status(400).send('Username already exists.');
    }
  } catch (err) {
    response.status(500).send(err);
  }
});

router.post('/login', async (request: express.Request, response: express.Response) => {
  try {
    const { username, password } = request.body;
    const user = await users.getByName(username);

    // user doesn't exist
    if (user === undefined) response.status(400).send('Bad username or password.');

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = await jwt.sign({ user }, config.SECRET_KEY, { expiresIn: '2h' });
      response.status(200).send({ token, username });
    } else {
      response.status(400).send('Bad username or password.');
    }
  } catch (err) {
    response.status(500).send(err);
  }
});

router.delete('/:id', async (request: express.Request, response: express.Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    const res = await users.deleteById(id);
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
  // delete all users
  router.delete('/', async (request: express.Request, response: express.Response) => {
    try {
      const res = await users.deleteAll();
      response.status(200).send(humps.camelizeKeys(res));
    } catch (err) {
      response.status(500).send(err);
    }
  });
}

module.exports = router;
