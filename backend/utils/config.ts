import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const { SECRET_KEY, MODE, PORT, DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

export const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT as string, 10),
});
