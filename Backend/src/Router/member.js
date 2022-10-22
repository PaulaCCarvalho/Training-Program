const {Router} = require('express');
const {MemberController} = require('../Controller');
const {verifyToken} = require('../Middleware/Authentication');

const memberRouter = Router();
const memberController = new MemberController();

memberRouter
    .get('/login', memberController.login)
    .get('/usuario', memberController.find)
    .post('/usuario', memberController.add)
    .get('/usuario/:id', memberController.findOne)
    // .put('/usuario/:id', memberController.alter)
    // .delete('/usuario/:id', memberController.delete)

module.exports = memberRouter;