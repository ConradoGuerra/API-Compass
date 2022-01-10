const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//Validation for request inputs, it will check the input
//Validação para os inputs
const { check } = require("express-validator");

//End point to search the user by it's name => GET => /users/getByUserName/:userName
router.get(
  "/getByUserName/:userName",
  [check("userName").trim().notEmpty()],
  userController.getUserByName
);

//End point to search the user by it's id =>  GET => /users/getByUserId/:userid
router.get(
  "/getByUserId/:userId",
  [check("userId").trim().isNumeric().notEmpty()],
  userController.getUserById
);

//End point to create an user => POST => /users/createUser
router.post(
  "/createUser",
  [
    check("fullName").trim().isString().notEmpty(),
    check("birthday").trim().isDate().notEmpty(),
    check("gender").trim().isString().notEmpty(),
    check("cityId").trim().isNumeric().notEmpty(),
  ],
  userController.postCreateUser
);

//End point to update an user => PATCH => /users/updateUser
router.patch(
  "/updateUser/:userId",
  [check("userId").trim().isNumeric().notEmpty()],
  userController.patchUpdateUserName
);

//End point to delete an user => DELETE => /users/deleteUser
router.delete(
  "/deleteUser/:userId",
  [check("userId").trim().isNumeric().notEmpty()],
  userController.deleteUser
);

module.exports = router;
