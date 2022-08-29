const router = require("express").Router();
const User = require("../models/user.model");

// A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.
// A router behaves like middleware itself, so you can use it as an argument to app.use() or as the argument to another router’s use() method.

// Model Methods Example
// For the full list of Model methods and options check Mongoose documentation
// User.find({username : "Prasan"}).then(res => console.log(res));

// GET ALL USERS
router.get("/", (req, res) => {  
  User.find()
    .then((data) => res.json(data))
    .catch((err) => res.status("400").json(`Error: ${err}`));
});


// ADD NEW USER
router.post("/add", (req, res) => {
  const newUser = req.body;
  const user = new User(newUser);

  user
    .save()
    .then(() => res.json("User added successfully"))
    .catch((err) => res.status("400").json(`Error: ${err}`));
});

module.exports = router;
