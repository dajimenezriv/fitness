import { pool } from '../utils/config';
import { NewUserType, UserType } from '../data_types';

/*
 *
 * PRODUCTION
 *
 */

export const getAll = (): Promise<UserType[]> =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users', (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

export const getById = (id: number): Promise<UserType> =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [id], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows[0]);
    });
  });

export const getByName = (username: string): Promise<UserType> =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE username = $1', [username], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows[0]);
    });
  });

export const add = (user: NewUserType): Promise<UserType> =>
  new Promise((resolve, reject) => {
    try {
      const { username, email, password } = user;

      pool.query(
        `INSERT INTO users
      (username, email, password)
      VALUES ($1, $2, $3) RETURNING *`,
        [username, email, password],
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result.rows[0]);
        },
      );
    } catch (err) {
      reject(err);
    }
  });

export const deleteById = (id: number): Promise<number> =>
  new Promise((resolve, reject) => {
    pool.query('DELETE FROM users WHERE id = $1', [id], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

/*
 *
 * TESTING
 *
 */

export const deleteAll = (): Promise<number> =>
  new Promise((resolve, reject) => {
    pool.query('DELETE FROM users', (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });
