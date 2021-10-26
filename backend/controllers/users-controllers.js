const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

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

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if ( !errors.isEmpty() ) {
    console.log(errors);
    return next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const errMsg = `Signing up failed. Error: ${error}`;
    console.log(errMsg);
    const httpError = new HttpError(errMsg, 500);

    return next(httpError);
  }

  console.log(existingUser);
  if (existingUser) {
    const httpError = new HttpError("User exists already, please login instead.", 422) 

    return next(httpError);
  }

  const createdUser = new User({
    name,
    email,
    image: "https://upload.wikimedia.org/wikipedia/zh/c/c8/Snoopy%28The_Peanuts%29.jpg",
    password, 
    places
  });
  
  try {
    await createdUser.save();
  }  catch (error) {
    const errMsg = `Error occurs while saving user. Error: ${error}`;
    console.log(errMsg);
    const httpError = new HttpError(errMsg, 500);

    return next(httpError);
  }

  res.status(201).json({
    message: "success",
    created_user: createdUser.toObject({ getters: true }),
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
