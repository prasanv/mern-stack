const mongoose = require("mongoose");

// Models are defined through the Schema interface.

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural version of your model name.
// `Users` is the name of the collection under the DB `mern` in MongoDB
const User = mongoose.model("User", userSchema);

module.exports = User;
