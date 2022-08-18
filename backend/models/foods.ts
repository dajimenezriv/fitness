export {};
const { Pool } = require('pg');
const config = require('../utils/config');

type Food = {
  id: number;
  name: string;
  market: string;
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
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
    pool.query('SELECT * FROM foods', (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

const getById = (id: number) =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM foods WHERE id = $1 LIMIT 1', [id], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows[0]);
    });
  });

const search = (name: string) =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM foods WHERE name iLIKE $1', [`%${name}%`], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

const add = (food: Food) =>
  new Promise((resolve, reject) => {
    try {
      const { name, market, calories, carbs, proteins, fats } = food;

      pool.query(
        `INSERT INTO foods 
      (name, market, calories, carbs, proteins, fats)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, market, calories, carbs, proteins, fats],
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
      const { id, name, market, calories, carbs, proteins, fats } = food;

      pool.query(
        `UPDATE foods
      SET name=$2, market=$3, calories=$4, carbs=$5, proteins=$6, fats=$7
      WHERE id=$1
      RETURNING *`,
        [id, name, market, calories, carbs, proteins, fats],
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
    pool.query('DELETE FROM foods WHERE id = $1', [id], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
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
  search,
  add,
  update,
  deleteAll,
  deleteById,
};
