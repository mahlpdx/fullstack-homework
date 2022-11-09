const e = require("express");
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static("public"));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// GET request
app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.post("/submit", (req, res) => {
  res.set("Content-Type", "text/html");
  res.write(`Name: ${req.body.name}<br>`);
  res.write(`Email: ${req.body.email}<br>`);
  res.write(`Comment: ${req.body.message}<br>`);
  if (req.body.checkbox) {
    res.write(`Checkbox: Yes, sign me up for the newsletter.<br>`);
  } else {
    res.write(`Checkbox: No, thank you.<br>`);
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
