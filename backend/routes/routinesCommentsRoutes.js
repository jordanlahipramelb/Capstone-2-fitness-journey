"use strict";

/** Routes for routines comments. */

const jsonschema = require("jsonschema");
const express = require("express");

const { NotFoundError, BadRequestError } = require("../expressError");
const {
  ensureAdmin,
  ensureLoggedIn,
  ensureAdminOrCorrectUser,
} = require("../middleware/auth");

const RoutineComment = require("../models/routineCommentModel");
const routineCommentNewSchema = require("../schemas/routineCommentNew.json");
const routineCommentUpdateSchema = require("../schemas/routineCommentUpdate.json");

// You must pass {mergeParams: true} to the child router if you want to access the params from the parent router.
const router = new express.Router({ mergeParams: true });

/** GET /  =>
 *   { id, username, body, date, routine_id }
 *
 * get comments for routine
 *
 * Authorization required: logged in user
 */

router.get("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const comments = await RoutineComment.getAll(req.params.routine_id);

    return res.json({ comments });
  } catch (err) {
    return next(err);
  }
});

/** POST / { comment } =>  { comment }
 * Create a comment
 * comment should be { username, body, date, routine_id }
 * Returns { id, username, body, date  }
 *
 * Authorization required: Logged in user
 */

router.post("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, routineCommentNewSchema);

    // if json is not valid, return errors
    if (!validator.valid) {
      const errs = validator.errors.map((er) => er.stack);

      throw new BadRequestError(errs);
    }

    const comment = await RoutineComment.create(req.body);
    return res.status(201).json({ comment });
  } catch (err) {
    return next(err);
  }
});

/** PUT /[id] { comment } => { comment }
 *
 * Updates existing comment data.
 *
 * fields can be: { username, body, date, routine_id }
 *
 * Returns { id, username, body, date, routine_id}
 *
 * Authorization required: admin
 */

router.put("/:id", ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, routineCommentUpdateSchema);

    if (!validator.valid) {
      const errs = validator.errors.map((er) => er.stack);

      throw new BadRequestError(errs);
    }

    const comment = await RoutineComment.update(req.params.id, req.body);

    return res.json({ comment });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization required: Admin or same user
 */

router.delete("/:id", ensureAdminOrCorrectUser, async (req, res, next) => {
  try {
    await RoutineComment.remove(req.params.id);

    return res.json({ deleted: "comment deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
