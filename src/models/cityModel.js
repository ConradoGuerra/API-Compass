const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/database");

class City extends Model {}

City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNul: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "City",
    timestamps: true,
  }
);

module.exports = City;
