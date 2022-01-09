//Requiring the user model | Importanto o model user
const User = require("../models/userModel");
const { Op } = require("sequelize");
const City = require("../models/cityModel");

//Exporting the middlewares
module.exports = {
  //Get Users: Find all the users in db by their userName | Busca por todos os usuários no banco pelos seus nomes
  async getUserByName(req, res, next) {
    try {
      const userName = req.params.userName;
      const users = await User.findAll({
        where: { fullname: { [Op.like]: `%${userName}%` } },
        include: City,
      });
      //If there is not any user, then will be throwed an error | Se não houver um usuário, será enviado um erro.
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
      //If an error exists then will be send to error middleware, the error and its status | Se ocorrer algum então será enviado o erro para o middleware de erros
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  async getUserById(req, res, next) {
    try {
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
      //If an error exists then will be send to error middleware, the error and its status | Se ocorrer algum então será enviado o erro para o middleware de erros
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  //Create User: Create an user in db | Criação do usuário no banco
  async postCreateUser(req, res, next) {
    try {
      const { fullName, birthday, gender, cityId } = req.body;
      //Getting the difference (in miliseconds) between now and the user's birthday
      const dateDifferenceMS = Date.now() - new Date(birthday);

      //Getting the value in year of the users age (It's between dateDifferenceMS * (3.17097919837651 * 10-¹¹))
      const age = Math.floor(
        dateDifferenceMS * (3.17097919837651 * Math.pow(10, -11))
      );

      const createdUser = await User.create({
        fullName: fullName,
        birthday: birthday,
        gender: gender,
        CityId: cityId,
        age: age,
      });
      res
        .status(201)
        .json({ message: "User created successfully!", data: createdUser });
    } catch (err) {
      //If an error exists then will be send to error middleware, the error and its status | Se ocorrer algum então será enviado o erro para o middleware de erros
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  async patchUpdateUserName(req, res, next) {
    try {
      const userId = req.params.userId;
      const { fullName } = req.body;
      const user = await User.findByPk(userId);

      //If there is not any user, then will be throwed an error | Se não houver um usuário, será enviado um erro.
      if (!user) {
        const err = {
          statusCode: 404,
          message: "User not found.",
        };
        throw err;
      }

      //If the input is undefined, then the data will be the old one || Caso este input não possua valor, então será utilizado o dado antigo
      user.fullName = fullName;

      //Saving the update
      const result = await user.save();

      res.status(200).json({
        message: `User ${fullName} uppdated succesfully.`,
        data: result,
      });
    } catch (err) {
      //If an error exists then will be send to error middleware, the error and its status | Se ocorrer algum então será enviado o erro para o middleware de erros
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const userId = req.params.userId;
      await User.destroy({ where: { id: userId } });
      res.status(200).json({
        message: `User deleted succesfully.`,
      });
    } catch (err) {
      //If an error exists then will be send to error middleware, the error and its status | Se ocorrer algum então será enviado o erro para o middleware de erros
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};
