const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersControllers.getAllUsers);

router.post(
  "/signup",
  [
    check("name").isLength({ min: 4 }),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  usersControllers.signUp
);

router.post("/login", usersControllers.login);

module.exports = router;
