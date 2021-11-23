"use strict";

/** Express app for Fitness Journey */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { NotFoundError } = require("./expressError");

/** Routes */

/*******/

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

/** Handle 404 errors -- this matches everything and will return NotFoundError */

app.use((req, res, next) => {
  return next(new NotFoundError());
});

/** Generic error handler; anything that doesn't match goes here */

app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
