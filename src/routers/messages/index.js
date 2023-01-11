const express = require("express");
const router = express.Router();

const postMessagesRouter = require("./post.messages");
const postImageRouter = require("./post.image");

router.use(postMessagesRouter);
router.use(postImageRouter);

module.exports = router;
