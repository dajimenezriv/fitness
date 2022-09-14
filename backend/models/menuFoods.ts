import { pool } from '../utils/config';
import { NewMenuFoodType, MenuFoodType } from '../data_types';

/*
 *
 * PRODUCTION
 *
 */

export const getByMenuId = (menuId: number): Promise<MenuFoodType[]> =>
  new Promise((resolve, reject) => {
    pool.query(
      `
    SELECT * FROM foods INNER JOIN menu_foods
    ON foods.id = menu_foods.food_id
    WHERE menu_id = $1
    `,
      [menuId],
      (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result.rows);
      }
    );
  });

export const getById = (id: number): Promise<MenuFoodType> =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM menu_foods WHERE id = $1 LIMIT 1', [id], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows[0]);
    });
  });

export const add = (menuFood: NewMenuFoodType): Promise<MenuFoodType> =>
  new Promise((resolve, reject) => {
    try {
      const { menuId, foodId, quantity, mealNumber } = menuFood;

      pool.query(
        `INSERT INTO menu_foods
      (menu_id, food_id, quantity, meal_number)
      VALUES ($1, $2, $3, $4) RETURNING *`,
        [menuId, foodId, quantity, mealNumber],
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result.rows[0]);
        }
      );
    } catch (err) {
      reject(err);
    }
  });

export const update = (menuFood: MenuFoodType): Promise<MenuFoodType> =>
  new Promise((resolve, reject) => {
    try {
      const { id, quantity, mealNumber } = menuFood;

      pool.query(
        `UPDATE menu_foods
      SET quantity=$2, meal_number=$3
      WHERE id=$1
      RETURNING *`,
        [id, quantity, mealNumber],
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
    pool.query('DELETE FROM menu_foods WHERE id = $1', [id], (error: any, result: any) => {
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
    pool.query('DELETE FROM menu_foods', (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });
