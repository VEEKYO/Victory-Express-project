import { Router } from 'express'

const router = Router()
import { getUsers, getUser, deleteUser, createUser, updateUser } from '../controller/users';
// var database = require('../database.json');

/* GET users listing. */

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.put('/:id', updateUser);

module.exports = router;
