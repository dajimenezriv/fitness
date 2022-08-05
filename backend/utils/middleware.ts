import * as express from 'express';

export {};

const logger = require('./logger');

const postgreSQLHeaders = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');

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
  unknownEndpoint,
  errorHandler,
};
