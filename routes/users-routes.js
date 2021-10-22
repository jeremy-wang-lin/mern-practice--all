const express = require("express");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersControllers.getAllUsers);

router.post("/signup", usersControllers.signUp);

router.post("/login", usersControllers.login);

module.exports = router;
