const mongoose = require("mongoose");

// Models are defined through the Schema interface.
const exerciseSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural version of your model name.
// `Exercises` is the name of the collection under the DB `mern` in MongoDB
const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
