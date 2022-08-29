require("dotenv").config({ path: "../backend/.env" });

// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
// The process object is an instance of Node.js EventEmitter.
// Node.js `process.env` property returns an object containing the user environment
// console.log(process.env);

const DB_URI = process.env?.DB_URI;
const PORT = process.env?.PORT;

module.exports = {
  DB_URI,
  PORT,
};
