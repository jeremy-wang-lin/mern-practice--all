const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "chia min lin",
    email: "alucard.lin@gmail.com",
    password: "xxx",
  },
  {
    id: "u2",
    name: "charming",
    email: "cmlinzr@tsmc.com",
    password: "yyy",
  },
];

const getAllUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signUp = (req, res, next) => {
  const errors = validationResult(req);
  if ( !errors.isEmpty() ) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Could not create user, email already exists", 422);
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({
    message: "success",
    created_user: createdUser,
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const loggedInUser = DUMMY_USERS.find(
    (u) => u.email === email && u.password === password
  );
  if (!loggedInUser) {
    throw new HttpError(
      "Unauthorized. It seems you enter wrong e-mail or password!",
      401
    );
  }

  res.json({ message: "Logged in" });
};

exports.getAllUsers = getAllUsers;
exports.signUp = signUp;
exports.login = login;
