export {};

const { Pool } = require('pg');
const config = require('../utils/config');

type MenuFood = {
  id: number;
  menuId: number;
  foodId: number;
  quantity: number;
  mealNumber: number;
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

const getById = (id: number) =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM menu_foods WHERE id = $1 LIMIT 1', [id], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows[0]);
    });
  });

const getByMenuId = (menuId: number) =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM menu_foods WHERE menu_id = $1', [menuId], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

const add = (menuFood: MenuFood) =>
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

const update = (menuFood: MenuFood) =>
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

const deleteById = (id: number) =>
  new Promise((resolve, reject) => {
    pool.query('DELETE FROM menu_foods WHERE id = $1', [id], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

module.exports = {
  getById,
  getByMenuId,
  add,
  update,
  deleteById,
};
