import { pool } from '../utils/config';
import { NewFoodType, FoodType } from '../data_types';

/*
 *
 * PRODUCTION
 *
 */

export const getAll = (): Promise<FoodType[]> =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM foods', (error: Error, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

export const getById = (id: number): Promise<FoodType> =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM foods WHERE id = $1 LIMIT 1', [id], (error: Error, result: any) => {
      if (error) reject(error);
      else resolve(result.rows[0]);
    });
  });

export const getByName = (name: string): Promise<FoodType> =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM foods WHERE name iLIKE $1', [`%${name}%`], (error: Error, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

export const add = (food: NewFoodType): Promise<FoodType> =>
  new Promise((resolve, reject) => {
    try {
      const { name, nutrients } = food;

      pool.query(
        `INSERT INTO foods 
      (name, nutrients)
      VALUES ($1, $2) RETURNING *`,
        [name, nutrients],
        (error: Error, result: any) => {
          if (error) reject(error);
          else resolve(result.rows[0]);
        },
      );
    } catch (err) {
      reject(err);
    }
  });

export const update = (food: FoodType): Promise<FoodType> =>
  new Promise((resolve, reject) => {
    try {
      const { id, name, nutrients } = food;

      pool.query(
        `UPDATE foods
      SET name=$2, nutrients=$2
      WHERE id=$1
      RETURNING *`,
        [id, name, nutrients],
        (error: Error, result: any) => {
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
    pool.query('DELETE FROM foods WHERE id = $1', [id], (error: Error, result: any) => {
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
    pool.query('DELETE FROM foods', (error: Error, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });
