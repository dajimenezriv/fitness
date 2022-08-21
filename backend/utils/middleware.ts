import * as express from 'express';

export {};

const jwt = require('jsonwebtoken');
const logger = require('./logger');
const config = require('../utils/config');

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any }; // eslint-disable-line
  }
}

const postgreSQLHeaders = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');

  next();
};

// gets the logged user using the bearer token
const getUser = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  request.session.user = null;
  const bearerHeader = request.headers.authorization;
  if (bearerHeader !== undefined) {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, config.SECRET_KEY, (err: any, data: any) => {
      if (!(err || data === undefined)) request.session.user = data.user;
    });
  }

  next();
};

const unknownEndpoint = (request: express.Request, response: express.Response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
  logger.error(error.message);

  if (error.name === 'CastError') return response.status(400).send({ error: 'malformatted id' });
  if (error.name === 'ValidationError') return response.status(400).json({ error: error.message });

  return next(error);
};

module.exports = {
  postgreSQLHeaders,
  getUser,
  unknownEndpoint,
  errorHandler,
};
