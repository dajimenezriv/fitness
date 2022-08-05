require('dotenv').config();

const { MODE, PORT, DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

module.exports = {
  MODE,
  PORT,
  DB_HOST,
  DB_NAME,
  DB_PORT: parseInt(DB_PORT, 10),
  DB_USER,
  DB_PASSWORD,
};
