const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");

//Validation for request inputs, it will check the input
//Validação para os inputs
const { check } = require("express-validator");

//End point to search the city by it's name => GET => /cities/getCityByName/:cityName
router.get(
  "/getCityByName/:cityName",
  [check("cityName").trim()],
  cityController.getCities
);

//End point to search the state by it's name => GET => /cities/getStateByName/:stateName
router.get(
  "/getStateByName/:stateName",
  [check("stateName").trim()],
  cityController.getStates
);

//End point to create a city => POST => /cities/createCity
router.post(
  "/createCity",
  [check("cityName").trim().notEmpty(), check("stateName").trim().notEmpty()],
  cityController.createCity
);

module.exports = router;
