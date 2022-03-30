"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const users_1 = require("../controller/users");
// var database = require('../database.json');
/* GET users listing. */
router.get('/', users_1.getUsers);
router.post('/', users_1.createUser);
router.get('/:id', users_1.getUser);
router.delete('/:id', users_1.deleteUser);
router.put('/:id', users_1.updateUser);
module.exports = router;
