//Requiring the user model | Importanto o model user
const User = require("../models/userModel");
const { Op } = require("sequelize");
const City = require("../models/cityModel");
const { validationResult } = require("express-validator");
const validationErrorVerify = require('./functions/validationErrorVerify')

module.exports = {
  /* This controller will use the userName from req.param to search the user in database by its name 
  Esse controller utilizará o userName do req.param para buscar o usuário no banco de dados pelo seu nome*/
  async getUserByName(req, res, next) {
    try {
      // Verify if exists validation error
      const { errors } = validationResult(req);
      validationErrorVerify(errors)

      const userName = req.params.userName;
      const users = await User.findAll({
        where: { fullname: { [Op.like]: `%${userName}%` } },
        include: City,
      });

      if (!users) {
        const err = {
          statusCode: 404,
          message: "User not found.",
        };
        throw err;
      }

      res
        .status(200)
        .json({ message: "Users fetched successfully!", data: users });
    } catch (err) {
      next(err);
    }
  },

  /* This controller will use the userId from req.param to search the user in database by its id 
  Esse controller utilizará o userId do req.param para buscar o usuário no banco de dados pelo seu id */
  async getUserById(req, res, next) {
    try {
      // Verify if exists validation error
      const { errors } = validationResult(req);
      validationErrorVerify(errors)

      const userId = req.params.userId;

      const user = await User.findByPk(userId, { include: City });
      if (!user) {
        const err = {
          statusCode: 404,
          message: "User not found.",
        };
        throw err;
      }

      res
        .status(200)
        .json({ message: "User fetched successfully!", data: user });
    } catch (err) {
      next(err);
    }
  },

  /* This controller will get the body request to create an user in db 
  Esse controller irá utilizar os inputs que estão no body request para criar um usuário no banco de dados */
  async postCreateUser(req, res, next) {
    try {
      // Verify if exists validation error
      const { errors } = validationResult(req);
      validationErrorVerify(errors)

      const { fullName, birthday, gender, cityId } = req.body;

      const cityFound = await City.findByPk(cityId);
      if (!cityFound) {
        const error = new Error(
          "No city found, please create a city before create this user."
        );
        error.statusCode = 422;
        throw error;
      }

      const age = ageCalculator(birthday);

      const createdUser = await User.create({
        fullName: fullName,
        birthday: birthday,
        gender: gender,
        CityId: cityId,
        age: age,
      }).catch((err) => {
        const error = new Error(err.original.code);
        error.statusCode = 500;
        throw error;
      });
      
      res
        .status(201)
        .json({ message: "User created successfully!", data: createdUser });
    } catch (err) {
      next(err);
    }
  },

  /* This controller will use the userId from req.param to search the user in database and update its name 
  Esse controller utilizará o userId do req.param para buscar o usuário no banco de dados e fazer o update do seu nome*/
  async patchUpdateUserName(req, res, next) {
    try {
      // Verify if exists validation error
      const { errors } = validationResult(req);
      validationErrorVerify(errors)

      const userId = req.params.userId;

      const user = await User.findByPk(userId).catch((err) => {
        const error = new Error(err.original.code);
        error.statusCode = 500;
        throw error;
      });

      if (!user) {
        const err = {
          statusCode: 404,
          message: "User not found.",
        };
        throw err;
      }

      const { fullName } = req.body;
      user.fullName = fullName;

      const result = await user.save().catch((err) => {
        const error = new Error(err.original.code);
        error.statusCode = 500;
        throw error;
      });

      res.status(200).json({
        message: `User updated successfully.`,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },

  /* This controller will use the userId from req.param to search and delete the user in database  
  Esse controller utilizará o userId do req.param para buscar e deletar o usuário do banco de dados*/
  async deleteUser(req, res, next) {
    try {
      // Verify if exists validation error
      const { errors } = validationResult(req);
      validationErrorVerify(errors)
      
      const userId = req.params.userId;

      await User.destroy({ where: { id: userId } });

      res.status(200).json({
        message: `User deleted successfully.`,
      });
    } catch (err) {
      next(err);
    }
  },
};

/* Function to calcule the age of user
  Returns the user's age in years from the difference between actual date and user's birthday
  @param {string} userBirthday

  Função para calcular a idade do usuário
  Retorna a idade do usuário em anos, resultado da diferença entre a data atual e a data de nascimento do usuário

 */
const ageCalculator = (userBirthday) => {
  //Date difference (in milliseconds)
  const dateDifferenceMS = Date.now() - new Date(userBirthday);

  //Function to convert milliseconds to years | Função para converter milissegundos para anos
  const msToYears = (dateDifferenceMS) => {
    return Math.floor(
      // (dateDifferenceMS * (3.17097919837651 * 10-¹¹) is the formula to convert milissecondts do years
      dateDifferenceMS * (3.17097919837651 * Math.pow(10, -11))
    );
  };

  const userAge = msToYears(dateDifferenceMS);

  return userAge;
};
