import { pool } from '../utils/config';
import { NewFoodType, FoodType } from '../data_types';

/*
 *
 * PRODUCTION
 *
 */

export const getAll = (): Promise<FoodType[]> =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM foods', (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

export const getById = (id: number): Promise<FoodType> =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM foods WHERE id = $1 LIMIT 1', [id], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows[0]);
    });
  });

export const getByName = (name: string): Promise<FoodType> =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM foods WHERE name iLIKE $1', [`%${name}%`], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

export const add = (food: NewFoodType): Promise<FoodType> =>
  new Promise((resolve, reject) => {
    try {
      const { name, calories, carbs, proteins, fats } = food;

      pool.query(
        `INSERT INTO foods 
      (name, calories, carbs, proteins, fats)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, calories, carbs, proteins, fats],
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result.rows[0]);
        }
      );
    } catch (err) {
      reject(err);
    }
  });

export const update = (food: FoodType): Promise<FoodType> =>
  new Promise((resolve, reject) => {
    try {
      const { id, name, calories, carbs, proteins, fats } = food;

      pool.query(
        `UPDATE foods
      SET name=$2, calories=$3, carbs=$4, proteins=$5, fats=$6
      WHERE id=$1
      RETURNING *`,
        [id, name, calories, carbs, proteins, fats],
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result.rows[0]);
        }
      );
    } catch (err) {
      reject(err);
    }
  });

export const deleteById = (id: number): Promise<number> =>
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

export const deleteAll = (): Promise<number> =>
  new Promise((resolve, reject) => {
    pool.query('DELETE FROM foods', (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });
