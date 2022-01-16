"use strict";

/** Routes for posts. */

const jsonschema = require("jsonschema");
const express = require("express");

const { NotFoundError, BadRequestError } = require("../expressError");
const {
  ensureAdminOrCorrectUser,
  ensureAdmin,
  ensureLoggedIn,
} = require("../middleware/auth");
const Routine = require("../models/routineModel");
const routineNewSchema = require("../schemas/routineNew.json");
const routineSearchSchema = require("../schemas/routineSearch.json");
const router = new express.Router();

/** GET / =>
 *  { routines: [ { id, name, username }, ... ] }
 *
 * Get all routines
 *
 * Authorization required: logged in user
 */

router.get("/", async (req, res, next) => {
  const searchTerm = req.query;

  try {
    const validator = jsonschema.validate(searchTerm, routineSearchSchema);

    // if json is not valid, return errors
    if (!validator.valid) {
      const errs = validator.errors.map((er) => er.stack);

      throw new BadRequestError(errs);
    }

    // perform search
    const routines = await Routine.findAll(searchTerm);

    return res.json({ routines });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id] => { routine }
 *
 * Get single routine with exercises
 *
 * Returns { id, name, username, exerciseName, dayOfWeek, sets, reps }
 *
 * Authorization required: logged in user
 */

router.get("/:id", async (req, res, next) => {
  try {
    const routine = await Routine.get(req.params.id);

    return res.json({ routine });
  } catch (err) {
    return next(err);
  }
});

/** POST / { routine } => { routine }
 *  { routines: [ { id, name, username, description }, ... ] }
 *
 * creates a new routine name with username who created it
 *
 * Returns { id, name, username, description }
 *
 * Authorization required: logged in user
 */

router.post("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, routineNewSchema);

    // if json is not valid, return errors
    if (!validator.valid) {
      const errs = validator.errors.map((er) => er.stack);
      console.error("Error with creating new routine", errs);
      throw new BadRequestError(errs);
    }

    const routine = await Routine.create(req.body);
    return res.status(201).json({ routine });
  } catch (err) {
    return next(err);
  }
});

/** PUT /[id] { routine } => { routine }
 *
 * Updates routine data.
 *
 * fields can be: { username, subject, body, date }
 *
 * Returns { id, username, subject, body, date }
 *
 * Authorization required: same user or admin
 */

router.put("/:id", ensureAdminOrCorrectUser, async (req, res, next) => {
  try {
    // const validator = jsonschema.validate(req.body, routineUpdateSchema);

    // if (!validator.valid) {
    //   const errs = validator.errors.map((er) => er.stack);

    //   throw new BadRequestError(errs);
    // }

    const post = await Routine.update(req.params.id, req.body);

    return res.json({ post });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization required: admin
 */

router.delete("/:id", ensureAdminOrCorrectUser, async (req, res, next) => {
  try {
    await Routine.remove(req.params.id);

    return res.json({ success: true, deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
