const router = require("express").Router();
const User = require("../models/user.model");

router.get("/", (req, res) => {
  User.find()
    .then((data) => res.json(data))
    .catch((err) => res.status("400").json(`Error: ${err}`));
});

router.post("/add", (req, res) => {
  const newUser = req.body;
  const user = new User(newUser);

  user
    .save()
    .then(() => res.json("User added successfully"))
    .catch((err) => res.status("400").json(`Error: ${err}`));
});

module.exports = router;
