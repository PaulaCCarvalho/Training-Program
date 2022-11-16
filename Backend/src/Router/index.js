const { Router } = require("express");
const ErrorHandler = require("../Middleware/ErrorHandler");
const challengeRouter = require("./challengeRouter");
const memberRouter = require('./member');
const tagRouter = require("./tagRouter");
const imgRouter = require("./imgRouter");
const solutionRouter = require('./solutionRouter');
const likeRouter = require('./likeRouter');

const router = Router();
router
.use('/api', memberRouter)
.use('/api', challengeRouter)
.use('/api', tagRouter)
.use('/api', solutionRouter)
.use('/api', likeRouter)
.use('/api', imgRouter)
.use(ErrorHandler);

module.exports = router;