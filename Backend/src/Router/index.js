const { Router } = require("express");
const challengeRouter = require("./challenge");
const memberRouter = require('./member');

const router = Router();
router
.use('/api', memberRouter)
.use('/api', challengeRouter)

module.exports = router;