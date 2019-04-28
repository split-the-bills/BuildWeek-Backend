const router = require("express").Router();
const Users = require("./users-model.js");
const {restircted} = require("../auth /authenticate");

router.get("/", restircted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;

//1. Get my outgoing

//2. Get my incoming
