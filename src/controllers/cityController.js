const City = require("../models/cityModel");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const validationErrorVerify = require('./functions/validationErrorVerify')

module.exports = {
  /* This controller will use the cityName from req.param to search the city in database by its name 
  Esse controller utilizará o cityName do req.param para buscar a cidade no banco de dados pelo seu nome*/
  async getCities(req, res, next) {
    try {
      // Verify if exists validation error
      const { errors } = validationResult(req);
      validationErrorVerify(errors)

      const cityName = req.params.cityName;
      const citiesFound = await City.findAll({
        where: {
          cityName: {
            [Op.like]: `%${cityName}%`,
          },
        },
      }).catch((err) => {
        const error = new Error(err.original.code);
        error.statusCode = 500;
        throw error;
      });

      if (citiesFound.length === 0) {
        const err = {
          statusCode: 404,
          message: "No cities found.",
        };
        throw err;
      }
      res
        .status(200)
        .json({ message: "Cities fetched successfully!", data: citiesFound });
    } catch (err) {
      next(err);
    }
  },

  /* This controller will get the stateName as req.param and search the state in database by its name
  Esse controller utilizará o stateName do req.param para buscar o estado no banco de dados pelo seu nome */
  async getStates(req, res, next) {
    try {
      // Verify if exists validation error
      const { errors } = validationResult(req);
      validationErrorVerify(errors)

      const stateName = req.params.stateName;

      const statesFound = await City.findAll({
        where: {
          stateName: {
            [Op.like]: `%${stateName}%`,
          },
        },
      }).catch((err) => {
        const error = new Error(err.original.code);
        error.statusCode = 500;
        throw error;
      });

      if (statesFound.length === 0) {
        const err = {
          statusCode: 404,
          message: "No states found.",
        };
        throw err;
      }

      res
        .status(200)
        .json({ message: "States fetched successfully!", data: statesFound });
    } catch (err) {
      next(err);
    }
  },

  /* This controller will get the body request to create a city in db 
  Esse controller irá utilizar os inputs que estão no body request para criar uma cidade no banco de dados */
  async createCity(req, res, next) {
    try {
      // Verify if exists validation error
      const { errors } = validationResult(req);
      validationErrorVerify(errors)

      const { cityName, stateName } = req.body;

      const createdCity = await City.create({
        cityName: cityName,
        stateName: stateName,
      }).catch((err) => {
        // If the city AND the state already exists in the database
        if (err.errors[0].type === "unique violation") {
          const error = new Error("City and State already exist.");
          error.statusCode = 409;
          throw error;
        }
        const error = new Error(err.original.code);
        error.statusCode = 500;
        throw error;
      });

      res
        .status(201)
        .json({ message: "City created succesfully!", data: createdCity });
    } catch (err) {
      next(err);
    }
  },
};
