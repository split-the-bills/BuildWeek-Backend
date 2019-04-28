const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model.js");
const { jwtKey } = require("./authenticate.js");

//const jwtSecret = require("../config/secret.js").jwtSecret;
// could also descruct it
// const { jwtSecret  }= require('../config/secrets');

// for endpoints beginning with /api/auth

router.post("/register", (req, res) => {
  //in a real app we would like to sign a token on register
  //create a hash password from user's password
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 6); //2^6
  //override the user password with hash password
  user.password = hash;
  console.log("User", user);
  Users.add(user)
    .then(saved => {
      console.log("TOKEN generation");
      const token = generateToken(user);
      console.log("TOKEN IS HERE", token);
      res.status(200).json({ saved, token });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});
router.post("/login", (req, res) => {
  let username = req.body.username;
  let { password } = req.body;

  console.log("USername ", username);
  Users.findBy({ username: username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome${user.username}!, Here is your token:`,
          token
        });
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    phone: user.phone,
    email: user.email
  };
  const options = {
    expiresIn: "1d"
  };

  // const secret = 'shhhhdonttellanyone';
  //console.log("Secret", jwtSecret) //jwtSecret is an object,secret should be string ,so consoled it
  //and found that jwtSecret has a member with the same name jwtsecret as the object containing the secret in form of string
  //const jwtSecret = require("../config/secrets").jwtSecret;if I don't do .jwsecret then its object and to access it
  //everywhere I need to put JwtSecret.jwtSecret; object name and inside the object string name is same
  return jwt.sign(payload, jwtKey, options);
}
module.exports = router;

//localhost:9090/api/auth/register
