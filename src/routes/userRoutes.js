const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//Validation for request inputs, it will check the input
//Validação para os inputs
const { check } = require("express-validator");

//End point to search the user by it's name => GET => /users/getByUserName/:userName
router.get(
  "/getByUserName/:userName",
  [
    check("userName", "Invalid user name.")
      .trim()
      .isAlpha("pt-BR", { ignore: " " })
      .notEmpty(),
  ],
  userController.getUserByName
);

//End point to search the user by it's id =>  GET => /users/getByUserId/:userid
router.get(
  "/getByUserId/:userId",
  [check("userId", "Invalid user id.").trim().isNumeric().notEmpty()],
  userController.getUserById
);

//End point to create an user => POST => /users/createUser
router.post(
  "/createUser",
  [
    check("fullName", "Invalid name.")
      .trim()
      .isAlpha("pt-BR", { ignore: " " })
      .notEmpty(),
    check("birthday", "Invalid birthday.").trim().isDate().notEmpty(),
    check("gender", "Invalid gender.")
      .trim()
      .isAlpha("pt-BR", { ignore: " " })
      .notEmpty(),
    check("cityId", "Invalid city.").trim().isNumeric().notEmpty(),
  ],
  userController.postCreateUser
);

//End point to update an user => PATCH => /users/updateUser
router.patch(
  "/updateUser/:userId",
  [check("userId", "Invalid user id.").trim().isNumeric().notEmpty()],
  userController.patchUpdateUserName
);

//End point to delete an user => DELETE => /users/deleteUser
router.delete(
  "/deleteUser/:userId",
  [check("userId", "Invalid user id.").trim().isNumeric().notEmpty()],
  userController.deleteUser
);

module.exports = router;
