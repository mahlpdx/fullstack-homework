const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 5001;

// Add your code here

// Use the express-session module
app.use(
  session({
    store: new session.MemoryStore(),
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
    },
  })
);

app.get("*", (req, res) => {
  res.set("Content-Type", "text/html");
  res.status(200);
  if (req.session.routesVisited) {
    res.write(`Currently on route: ${req.url}
    <br><br>
    Previously visited:<br>&nbsp
     ${req.session.routesVisited.join(`<br>&nbsp`)}
    `);
    req.session.routesVisited.push(req.url);
    res.end();
  } else {
    req.session.routesVisited = [];
    res.write(
      `Currently on route: ${req.url}
    <br><br>
    Welcome to ${req.protocol}://${req.get("host")}${req.url}
    `
    );
    req.session.routesVisited.push(req.url);
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
