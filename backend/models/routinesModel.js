"use strict";

/** Related functions for posts. */

// Retrieve database
const db = require("../db");
// Retrieve functions that displays an error
const { NotFoundError } = require("../expressError");
// Retrieve function that helps with updating sql
const { sqlForPartialUpdate } = require("../helpers/sql");

class Routine {}

module.exports = Routine;
