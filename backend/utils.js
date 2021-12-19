const dotenv = require("dotenv").config();

if (dotenv.error) throw dotenv.error;

const db_URI = dotenv.parsed.DB_HOST;
const port = dotenv.parsed.PORT;

module.exports = {
  db_URI,
  port,
};
