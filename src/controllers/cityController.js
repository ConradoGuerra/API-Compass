const City = require("../models/cityModel");
const { Op } = require("sequelize");

module.exports = {
  async getCities(req, res, next) {
    try {
      const cityName = req.params.cityName;
      const cities = await City.findAll({
        where: {
          cityName: {
            [Op.like]: `%${cityName}%`,
          },
        },
      });
      if (cities.length === 0) {
        const err = {
          statusCode: 404,
          message: "No cities found.",
        };
        throw err;
      }
      res
        .status(200)
        .json({ message: "Cities fetched succesfully!", data: cities });
    } catch (err) {
      //If an error exists then will be send to error middleware, the error and its status
      //Se ocorrer algum então será enviado o erro para o middleware de erros
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  async getStates(req, res, next) {
    try {
      const stateName = req.params.stateName;
      const states = await City.findAll({
        where: {
          stateName: {
            [Op.like]: `%${stateName}%`,
          },
        },
      });
      if (states.length === 0) {
        const err = {
          statusCode: 404,
          message: "No states found.",
        };
        throw err;
      }
      res
        .status(200)
        .json({ message: "States fetched succesfully!", data: states });
    } catch (err) {
      //If an error exists then will be send to error middleware, the error and its status
      //Se ocorrer algum então será enviado o erro para o middleware de erros
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  async createCity(req, res, next) {
    try {
      const { cityName, stateName } = req.body;
      const createdCity = await City.create({
        cityName: cityName,
        stateName: stateName,
      });
      res
        .status(201)
        .json({ message: "City created succesfully!", data: createdCity });
    } catch (err) {
      //If an error exists then will be send to error middleware, the error and its status | Se ocorrer algum então será enviado o erro para o middleware de erros
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};
