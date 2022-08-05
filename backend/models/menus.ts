export {};

const { Pool } = require('pg');
const config = require('../utils/config');

type Menu = {
  id: number;
  name: string;
  numberOfMeals: number;
};

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

const getAll = () =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM menus', (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

const getById = (id: number) =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM menus WHERE id = $1 LIMIT 1', [id], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows[0]);
    });
  });

const add = (menu: Menu) =>
  new Promise((resolve, reject) => {
    try {
      const { name, numberOfMeals } = menu;

      pool.query(
        `INSERT INTO menus 
      (name, number_of_meals)
      VALUES ($1, $2) RETURNING *`,
        [name, numberOfMeals],
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result.rows[0]);
        }
      );
    } catch (err) {
      reject(err);
    }
  });

const addFood = (menuFood: MenuFood) =>
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

const update = (menu: Menu) =>
  new Promise((resolve, reject) => {
    try {
      const { id, name, numberOfMeals } = menu;

      pool.query(
        `UPDATE menus
      SET name=$2, number_of_meals=$3
      WHERE id=$1
      RETURNING *`,
        [id, name, numberOfMeals],
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result.rows[0]);
        }
      );
    } catch (err) {
      reject(err);
    }
  });

const updateFood = (menuFood: MenuFood) =>
  new Promise((resolve, reject) => {
    try {
      const { id, quantity, mealNumber } = menuFood;

      pool.query(
        `UPDATE menus
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
    pool.query('DELETE FROM menus WHERE id = $1', [id], (error: any, result: any) => {
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
    pool.query('DELETE FROM menus', (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

module.exports = {
  getAll,
  getById,
  add,
  addFood,
  update,
  updateFood,
  deleteById,
  deleteAll,
};
