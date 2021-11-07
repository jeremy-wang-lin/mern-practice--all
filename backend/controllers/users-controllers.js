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

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (error) {
    const httpError = new HttpError("Fetching users failed.", 500);

    return next(httpError);
  }

  res.json({users: users.map(user => user.toObject({ getters: true }))});
};

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if ( !errors.isEmpty() ) {
    console.log(errors);
    return next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  const { name, email, password } = req.body;

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
    places: []
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

const login = async (req, res, next) => {
  //await new Promise(r => setTimeout(r, 5000));
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const errMsg = `Logging n failed. Error: ${error}`;
    console.log(errMsg);
    const httpError = new HttpError(errMsg, 500);

    return next(httpError);
  }

  if (!existingUser || existingUser.password !== password) {
    const httpError = new HttpError(
      "Unauthorized. It seems you enter wrong e-mail or password!",
      401
    );

    return next(httpError);
  }

  res.json({ message: "Logged in" });
};

exports.getAllUsers = getAllUsers;
exports.signUp = signUp;
exports.login = login;
