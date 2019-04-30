const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET || "my secret";
("adding a .env file to root of project with the JWT_SECRET variable");
module.exports = {
  restircted,
  jwtKey
};

// check for a valid web token
// make sure the user is authorized to see this endpoint
function restircted(req, res, next) {
  const token = req.headers.authorization;
  console.log("Token ", token);
  if (token) {
    jwt.verify(token, jwtKey, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ err: "user not verified" });
      } else {
        console.log("token confirmed", decodedToken);
        req.userInfo = decodedToken; //insert the decoded token in the request part because we pass req
        console.log(req.userInfo.subject);
        next();
      }
    });
  } else {
    res.status(500).json({
      message: "No token provided, must be set on the authorization Header"
    });
  }
}
