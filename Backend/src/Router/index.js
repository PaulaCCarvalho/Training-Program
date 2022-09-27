const { Router } = require("express");
const challengeRouter = require("./challengeRouter");
const memberRouter = require('./member');
const tagRouter = require("./tagRouter");

const router = Router();
router
.use('/api', memberRouter)
.use('/api', challengeRouter)
.use('/api', tagRouter)

module.exports = router;