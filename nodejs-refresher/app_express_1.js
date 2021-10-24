const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("MIDDLEWARE");

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const userName = body.split("=")[1];
    if (userName) {
      req.body = { name: userName };
    }
    next();
  });
});

app.use((req, res, next) => {
  console.log("INCOMING REQUEST");

  if (req.body) {
    return res.send("<h1> USER: " + req.body.name + "</h1>");
  }

  res.send(
    '<form method="POST"><input type="text" name="username" /><button type="submit">Create User</button></form>'
  );
});

app.listen(5000);
