const router = require("express").Router();
const Exercise = require("../models/exercise.model");

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
  Exercise.findById()
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
