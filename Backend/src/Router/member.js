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
    .put('/usuario/', verifyToken, memberController.alter)
    .delete('/usuario/:id', verifyToken, memberController.delete)

module.exports = memberRouter;