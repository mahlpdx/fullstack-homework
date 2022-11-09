const express = require("express");
const axios = require("axios");
const e = require("express");

const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// REST Countries URL
const url = "https://restcountries.com/v3.1/all";

// Add your code here

app.get("/", (req, res) => {
  // render pug template for the index.html file

  res.render("index", {
    heading: "Countries of the World",
    main: "Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world",
  });
});

app.get("/capitals", (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array

  axios
    .get(url)
    .then((response) => {
      let countries = [];
      // Loop through response and create formatted string
      response.data.forEach((el) => {
        countries.push(`${el.name.common} - ${el.capital}`);
      });
      // Sort alphabetically
      countries.sort();
      // Render page
      res.render("page", {
        heading: "Countries and Capitals",
        results: countries,
      });
    })
    .catch((err) =>
      // Render error case
      res.render(
        res.render("page", {
          heading: "Countries and Capitals",
          results: ["Unable to parse API"],
        })
      )
    );
});

app.get("/populous", (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population

  axios
    .get(url)
    .then((response) => {
      // Filter results
      let output = response.data.filter((el) => el.population > 50000000);
      // Sort results
      output.sort((a, b) => {
        a.population > b.population;
      });
      // Format results
      let formatted = [];
      output.forEach((el) => {
        formatted.push(
          `${el.name.common} - ${el.population.toLocaleString("en-US")}`
        );
      });
      // Render page
      res.render("page", {
        heading: "Most Populous Countries",
        results: formatted,
      });
    })
    .catch((err) =>
      // Render error case
      res.render(
        res.render("page", {
          heading: "Most Populous Countries",
          results: ["Unable to parse API"],
        })
      )
    );
});

app.get("/regions", (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array

  // API Call
  axios
    .get(url)
    .then((response) => {
      let output = response.data;
      let regions = {};
      // Create counts for each region
      output.forEach((el) => {
        if (el.region in regions) {
          regions[el.region] += 1;
        } else {
          regions[el.region] = 1;
        }
      });
      // Create formatted string for webpage
      let formatted = [];
      Object.entries(regions).forEach(([key, value]) =>
        formatted.push(`${key} - ${value.toLocaleString("en-US")}`)
      );
      // Render page
      res.render("page", {
        heading: "Regions of the World",
        results: formatted,
      });
    })
    .catch((err) =>
      // Render error case
      res.render(
        res.render("page", {
          heading: "Regions of the World",
          results: ["Unable to parse API"],
        })
      )
    );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
