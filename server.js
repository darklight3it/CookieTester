
"use strict";

const http = require("http");

const express = require("express");
const chalk = require("chalk");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const hbs = require("hbs");

const app = exports.app = express();
const server = http.Server(app);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(morgan("tiny"));

app.use(cookieParser());

// app.use((req, res, next) => {
//   console.log("****");
//   console.log(req.cookies);
//   console.log("");
//   console.log("> Cookies count", Object.keys(req.cookies).length || 0);
//   console.log("****");
//   next();
// });

require("./routes")(app);

app.use((err, req, res, next) => {
  console.log(chalk.bold.red("Generic server error caught: " + err.message));
  console.log(err.stack);
  res.sendStatus(err.status || 500);
});

server.listen(3000,
  () => console.log(chalk.bold.green("Server listening on port"), server.address().port));
