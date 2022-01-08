const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./util/database.sqlite",
});

module.exports = sequelize;
