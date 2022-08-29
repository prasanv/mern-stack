const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const utils = require("./utils");
const usersRouter = require("./routes/usersRouter");
const exercisesRouter = require("./routes/exercisesRouter");

// Express App
const app = express();

// Note: All middlewares should be declared before the route declaration
// `app.use()` Mounts the specified middleware function .

// CORS is a Node.js package for providing a Connect/Express middleware that can be used to enable Cross Origin Resource Sharing with various options.
app.use(cors());  // Enable cors all requests through middleware

// Node.js body parsing middleware, parses incoming request bodies in a middleware before your handlers, also available under the req.body property.
app.use(express.json());  // Built-in Express middleware, parses incoming requests with JSON payloads and it is based on body-parser.

app.use(express.urlencoded({ extended: false }));  // Built-in Express middleware, parses incoming requests with urlencoded payloads and is based on body-parser.

// All Routes
// simple get request
app.get("/", function (req, res) {
  // console.log(req, res);
  console.log(req.url)
  res.json({ name: "prasan" });
});

//Routes
// Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.
app.use("/users", usersRouter);
app.use("/exercises", exercisesRouter);

// Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
// Connect to Mongo DB
mongoose
  .connect(utils.DB_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB");
    app.listen(utils.PORT, () => {
      console.log(`App listening on http://127.0.0.1:${utils.PORT}/`);
    });
  })
  .catch((err) => console.log(err));
