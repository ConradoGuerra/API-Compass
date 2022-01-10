
//Verifying if env variable is for test or production | Verificando se a variável de ambiente é de test ou produção
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const express = require("express");

const userRoutes = require("./routes/userRoutes");
const cityRouter = require("./routes/cityRoutes");

const User = require("./models/userModel");
const City = require("./models/cityModel");

const app = express();

//Parsing json data
//Separando dados .json
app.use(express.json());


/* This middleware set headers to avoid CORS error, it allows browsers to access the data and use specific methods and headers
  Este middleware concede headers para evitar o erro CORS, ele permite que browsers acessem dados e permite o uso de métodos e headers específicos 
*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


//Registering the middlewares with the paths and routes
app.use("/users", userRoutes);
app.use("/cities", cityRouter);


//Association one-to-one, one user belongs to one city | Associação de um para um, um usuário pertence à uma cidade
User.belongsTo(City);
City.hasOne(User, {foreignKey: { allowNull: false, name: 'cityId'}});

//Creating an error middleware with default code | Criando um middleware para erros
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


//Exporting the app to server.js
module.exports = app;

