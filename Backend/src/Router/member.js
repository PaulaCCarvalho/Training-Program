const {Router} = require('express');
const {MemberController} = require('../Controller');

const memberRouter = Router();
const memberController = new MemberController();

memberRouter
    .get('/login', memberController.login)
    .get('/membro', memberController.find)
    .post('/membro', memberController.add)
    .get('/membro/:id', memberController.findOne)
    // .put('/membro/:id', memberController.alter)
    // .delete('/membro/:id', memberController.delete)

module.exports = memberRouter;