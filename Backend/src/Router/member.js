const {Router} = require('express');
const {MemberControler} = require('../Controller');
const memberRouter = Router();
const MemberControler = new MemberControler();
memberRouter.get('/member', (req, res) => {
    res.send('<h1>Member</h1>');
})

module.exports = memberRouter;