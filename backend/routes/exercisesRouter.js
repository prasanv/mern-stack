const router = require("express").Router();
const Exercise = require("../models/exercise.model");

// A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.
// A router behaves like middleware itself, so you can use it as an argument to app.use() or as the argument to another router’s use() method.


// GET ALL EXERCISES
router.get("/", (req, res) => {
  Exercise.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});


// ADD NEW EXERCISES
router.post("/add", (req, res) => {
  const exercise = new Exercise(req.body);
  exercise
    .save()
    .then((data) => {
      if (data === null) res.status(400).json(`Unable to add exercise`);
      res.json("Exercise added successfully");
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});


// GET EXERCISE BY ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Exercise.findById(id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});


// DELETE EXERCISE BY ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Exercise.findByIdAndDelete(id)
    .then((data) => {
      if (data === null) res.status(400).json(`Id not found`);
      res.json(`${id} - Exercise deleted successfully`);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});


// UPDATE EXERCISE BY ID
router.patch("/update/:id", (req, res) => {
  const id = req.params.id;
  Exercise.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (data === null) res.status(400).json(`Id not found`);
      res.json(`${id} - Exercise updated successfully`);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
