const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes); // => /api/places/..

app.use("/api/users", usersRoutes); // => /api/users/..

app.use((req, res, next) => {
  const httpError = new HttpError("Could not find this route", 404);
  throw httpError;
});

// Error handling middleware function
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const dbUrl =
  "mongodb+srv://jeremy:czj44WxD8Sbkf5mM@cluster0.nqbnx.mongodb.net/mern?retryWrites=true&w=majority";
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to DB. Start backend server.");
    app.listen(5000);
  })
  .catch((error) => {
    console.log("Connect DB FAILED! Error: " + error);
  });
