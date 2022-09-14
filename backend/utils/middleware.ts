import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as logger from './logger';
import * as config from './config';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any }; // eslint-disable-line
  }
}

export const postgreSQLHeaders = (request: Request, response: Response, next: NextFunction) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');

  next();
};

// gets the logged user using the bearer token
export const getUser = (request: Request, response: Response, next: NextFunction) => {
  request.session.user = undefined;
  const bearerHeader = request.headers.authorization;
  if (bearerHeader !== undefined) {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, config.SECRET_KEY as string, (err: any, data: any) => {
      if (!(err || data === undefined)) request.session.user = data.user;
    });
  }

  next();
};

export const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

export const errorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
  logger.error(error.message);

  if (error.name === 'CastError') return response.status(400).send({ error: 'malformatted id' });
  if (error.name === 'ValidationError') return response.status(400).json({ error: error.message });

  return next(error);
};
