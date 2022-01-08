const express = require('express')

const userController = require('../controllers/userController')
const router = express.Router()


//End point to search the user by userName  GET => /user/:userName
router.get('/userName/:userName', userController.getUserByName)

//End point to search the user by id  GET => /user/:userid
router.get('/userId/:userId', userController.getUserById)

router.post('/createUser', userController.postCreateUser)

router.patch('/updateUser/:userId', userController.patchUpdateUserName)

module.exports = router