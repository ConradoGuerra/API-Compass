const express = require('express')
const router = express.Router()
const cityController = require('../controllers/cityController')

//Fetch the cities => GET => "/" 
router.get('/getCity/:cityName', cityController.getCities)

//Fetch the cities => GET => "/" 
router.get('/getState/:stateName', cityController.getStates)

//Create a city => POST => "city"
router.post('/city', cityController.createCity)


module.exports = router