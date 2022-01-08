const City = require("../models/cityModel");

module.exports = {
  async getCities(req, res, next) {
    try {
      const cities = await City.findAll();
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
      //If an error exists then will be send to error middleware, the error and its status | Se ocorrer algum então será enviado o erro para o middleware de erros
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  async createCity(req, res, next) {
    try {
      const { name } = req.body;
      const createdCity = await City.create({name: name});
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
