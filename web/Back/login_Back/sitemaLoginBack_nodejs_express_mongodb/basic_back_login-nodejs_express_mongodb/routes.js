const express = require("express");
const router = express.Router();
const Controller = require("./src/controllers/Controller.js")
// const globalMiddleware = require("./src/middlewares/globalMiddleware.js");


// public routes
router.get('/users', Controller.getUsers);
router.post("/register", Controller.register);
router.post("/login", Controller.login);

module.exports = router;
