export {};
const { Pool } = require('pg');
const config = require('../utils/config');

type Food = {
  id: number;
  name: string;
  market: string;
  carbs: number;
  proteins: number;
  fats: number;
};

const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: parseInt(config.DB_PORT),
});

/*
 *
 * PRODUCTION
 *
 */

const getAll = () =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM foods', (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

const getById = (id: number) =>
  new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM foods WHERE id = $1 LIMIT 1',
      [id],
      (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result.rows[0]);
      }
    );
  });

const add = (food: Food) =>
  new Promise((resolve, reject) => {
    try {
      const { name, market, carbs, proteins, fats } = food;

      pool.query(
        `INSERT INTO foods 
      (name, market, carbs, proteins, fats)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, market, carbs, proteins, fats],
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result.rows[0]);
        }
      );
    } catch (err) {
      reject(err);
    }
  });

const update = (food: Food) =>
  new Promise((resolve, reject) => {
    try {
      const { id, name, market, carbs, proteins, fats } = food;

      pool.query(
        `UPDATE foods
      SET name=$2, market=$3, carbs=$4, proteins=$5, fats=$6
      WHERE id=$1
      RETURNING *`,
        [id, name, market, carbs, proteins, fats],
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result.rows[0]);
        }
      );
    } catch (err) {
      reject(err);
    }
  });

const deleteById = (id: number) =>
  new Promise((resolve, reject) => {
    pool.query(
      'DELETE FROM foods WHERE id = $1',
      [id],
      (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result.rows);
      }
    );
  });

/*
 *
 * TESTING
 *
 */

const deleteAll = () =>
  new Promise((resolve, reject) => {
    pool.query('DELETE FROM foods', (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteAll,
  deleteById,
};
