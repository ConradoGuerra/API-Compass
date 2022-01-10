//Verifying if env variable is test or production | Verificando se a variável de ambiente é de teste ou produção
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

//Following the variables (test or production) will be instantiate the database | Dependendo da variável de ambiente (test ou produção), será instanciado um banco
const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  logging: false, 
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_STORAGE,
});

module.exports = sequelize;
