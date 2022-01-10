const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");

//Validation for request inputs, it will check the input
//Validação para os inputs
const { check } = require("express-validator");

//End point to search the city by it's name => GET => /cities/getCityByName/:cityName
router.get(
  "/getCityByName/:cityName",
  [
    check("cityName", "Invalid city name.")
      .trim()
      .isAlpha("pt-BR", { ignore: " " })
      .notEmpty(),
  ],
  cityController.getCities
);

//End point to search the state by it's name => GET => /cities/getStateByName/:stateName
router.get(
  "/getStateByName/:stateName",
  [
    check("stateName", "Invalid state name.")
      .trim()
      .isAlpha("pt-BR", { ignore: " " })
      .notEmpty(),
  ],
  cityController.getStates
);

//End point to create a city => POST => /cities/createCity
router.post(
  "/createCity",
  [
    check("cityName", "Invalid city name.")
      .trim()
      .isAlpha("pt-BR", { ignore: " " })
      .notEmpty(),
    check("stateName", "Invalid state name.")
      .trim()
      .isAlpha("pt-BR", { ignore: " " })
      .notEmpty(),
  ],
  cityController.createCity
);

module.exports = router;
