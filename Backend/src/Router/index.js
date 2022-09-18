const { Router } = require("express");
const memberRouter = require('./member');

const router = Router();
router.use('/api', memberRouter);

module.exports = router;