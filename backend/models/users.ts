export {};

const { Pool } = require('pg');
const config = require('../utils/config');

type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
};

const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
});

/*
 *
 * PRODUCTION
 *
 */

const getAll = () =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users', (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

const getById = (id: number) =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [id], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows[0]);
    });
  });

const getByName = (username: string) =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE username = $1', [username], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows[0]);
    });
  });

const add = (user: UserType) =>
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
        }
      );
    } catch (err) {
      reject(err);
    }
  });

/*
 *
 * TESTING
 *
 */

const deleteAll = () =>
  new Promise((resolve, reject) => {
    pool.query('DELETE FROM users', (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  deleteAll,
};
