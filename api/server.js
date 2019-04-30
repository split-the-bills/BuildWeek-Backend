const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("../auth /authRouter.js");
const usersRouter = require("../users/usersRouter.js");
const eventsRouter = require("../events/eventsRouter.js");
const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/api/auth", authRouter); //login and register will live here
server.use("/api/users", usersRouter);
server.use("/api/events", eventsRouter);

server.get("/", (req, res) => {
  res.send("it's working");
});
module.exports = server;
