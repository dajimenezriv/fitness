import { pool } from '../utils/config';
import { NewMenuType, MenuType } from '../data_types';

/*
 *
 * PRODUCTION
 *
 */

export const getAll = (): Promise<MenuType[]> =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM menus', (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

export const getById = (id: number): Promise<MenuType> =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM menus WHERE id = $1 LIMIT 1', [id], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows[0]);
    });
  });

export const getByName = (name: string): Promise<MenuType> =>
  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM menus WHERE name iLIKE $1', [`%${name}%`], (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });

export const add = (menu: NewMenuType): Promise<MenuType> =>
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
        },
      );
    } catch (err) {
      reject(err);
    }
  });

export const update = (menu: MenuType): Promise<MenuType> =>
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
        },
      );
    } catch (err) {
      reject(err);
    }
  });

export const deleteById = (id: number): Promise<number> =>
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

export const deleteAll = (): Promise<number> =>
  new Promise((resolve, reject) => {
    pool.query('DELETE FROM menus', (error: any, result: any) => {
      if (error) reject(error);
      else resolve(result.rows);
    });
  });
