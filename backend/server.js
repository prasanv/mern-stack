const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const utils = require("./utils");
const usersRouter = require("./routes/usersRouter");
const exercisesRouter = require("./routes/exercisesRouter");

// Express App
const app = express();

// Middleware
// Enable cors all requests through middleware
app.use(cors());
//parser middleware before the route declaration part
app.use(express.json()); //parses request in JSON format
app.use(express.urlencoded({ extended: false })); //parses request in urlencoded format

// All Routes
// simple get request
app.get("/", function (req, res) {
  console.log(req.url);
  res.json({ name: "prasan" });
});

//Routes
app.use("/users", usersRouter);
app.use("/exercises", exercisesRouter);

// Connect to Mongo DB
mongoose
  .connect(utils.db_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB");
    app.listen(utils.port, () => {
      console.log(`App listening on http://127.0.0.1:${utils.port}/`);
    });
  })
  .catch((err) => console.log(err));
