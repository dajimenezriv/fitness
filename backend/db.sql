/* psql -h localhost -d fitness -U postgres */
/* psql -h localhost -d fitness -U postgres -f db.sql */

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS foods CASCADE;
DROP TABLE IF EXISTS menus CASCADE;
DROP TABLE IF EXISTS menu_foods CASCADE;

CREATE TABLE IF NOT EXISTS users (
  id INT GENERATED ALWAYS AS IDENTITY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS foods (
  id INT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  nutrients JSON NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS menus (
  id INT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL UNIQUE,
  number_of_meals INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS menu_foods (
  id INT GENERATED ALWAYS AS IDENTITY,
  menu_id INT NOT NULL,
  food_id INT NOT NULL,
  quantity INT NOT NULL,
  meal_number INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_foods FOREIGN KEY (food_id) REFERENCES foods (id) ON DELETE CASCADE,
  CONSTRAINT fk_menus FOREIGN KEY (menu_id) REFERENCES menus (id) ON DELETE CASCADE
);
