require('dotenv').config();

const { SECRET_KEY, MODE, PORT, DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

module.exports = {
  SECRET_KEY,
  MODE,
  PORT,
  DB_HOST,
  DB_NAME,
  DB_PORT: parseInt(DB_PORT, 10),
  DB_USER,
  DB_PASSWORD,
};
