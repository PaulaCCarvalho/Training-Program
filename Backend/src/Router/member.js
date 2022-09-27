const {Router} = require('express');

const memberRouter = Router();
memberRouter.get('/member', (req, res) => {
    res.send('<h1>Member</h1>');
})

module.exports = memberRouter;