const http = require("http");

const server = http.createServer((req, res) => {
  console.log("INCOMING REQUEST");
  console.log(req.method, req.url);

  if (req.method === "POST") {
    console.log("handling POST");

    let body = '';
    req.on('data', (chunk) => {
      console.log("on data. [" +  chunk + "]");
      body += chunk;
    });

    req.on('end', () => {
      console.log("on end. [" +  body + "]");
      const userName = body.split('=')[1];
      res.end('<h1>' + userName + '</h1>');
    });

  } else {
    res.setHeader("Content-Type", "text/html");
    res.end(
      '<form method="POST"><input type="text" name="username" /><button type="submit">Create User</button></form>'
    );
  }
});

server.listen(5000);
