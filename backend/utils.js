const dotenv = require("dotenv").config({ path: "../backend/.env" });

if (dotenv.error) throw dotenv.error;

const DB_URI = dotenv?.parsed.DB_URI;
const PORT = dotenv?.parsed.PORT;

module.exports = {
  DB_URI,
  PORT,
};
