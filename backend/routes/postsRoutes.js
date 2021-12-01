"use strict";

/** Routes for posts. */

const jsonschema = require("jsonschema");
const express = require("express");

const { NotFoundError, BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Post = require("../models/postModel");
const postNewSchema = require("../schemas/postNew.json");
const postUpdateSchema = require("../schemas/postUpdate.json");
const router = new express.Router();

/** GET /  =>
 *   { posts: [ { id, username, subject, body, date }, ...] }
 *
 * get all posts
 *
 * Authorization required: none
 */

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll();

    return res.json({ posts });
  } catch (err) {
    return next(err);
  }
});

/** GET /[ id ]  =>  { post }
 *
 * get single post
 *
 *  Returns { id, username, subject, body, date, comments: [ { id, username, body }, ... ] }
 *
 * Authorization required: none
 */

router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.get(req.params.id);

    return res.json({ post });
  } catch (err) {
    return next(err);
  }
});

/** POST / { post } =>  { post }
 *
 * create new post
 *
 * post should be { username, subject, body, date }
 *
 * Returns { id, username, subject, body, date  }
 *
 * Authorization required: admin
 */

router.post("/", ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, postNewSchema);

    // if json is not valid, return errors
    if (!validator.valid) {
      const errs = validator.errors.map((er) => er.stack);

      throw new BadRequestError(errs);
    }

    const post = await Post.create(req.body);
    return res.status(201).json({ post });
  } catch (err) {
    return next(err);
  }
});

/** PUT /[id] { post } => { post }
 *
 * Updates post data.
 *
 * fields can be: { username, subject, body, date }
 *
 * Returns { id, username, subject, body, date }
 *
 * Authorization required: admin
 */

router.put("/:id", ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, postUpdateSchema);

    if (!validator.valid) {
      const errs = validator.errors.map((er) => er.stack);

      throw new BadRequestError(errs);
    }

    const post = await Post.update(req.params.id, req.body);

    return res.json({ post });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization required: admin
 */

router.delete("/:id", ensureAdmin, async (req, res, next) => {
  try {
    await Post.remove(req.params.id);

    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
