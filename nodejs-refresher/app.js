const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/user", (req, res, next) => {
  return res.send("<h1> USER: " + req.body.username + "</h1>");
});

app.get("/", (req, res, next) => {
  console.log("INCOMING REQUEST");

  res.send(
    '<form action="/user" method="POST"><input type="text" name="username" /><button type="submit">Create User</button></form>'
  );
});

app.listen(5000);
