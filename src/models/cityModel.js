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
    cityName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stateName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "city",
    timestamps: true,
    indexes: [
        {
          // Fields cityName AND stateName should be unique
            unique: true,
            fields: ['cityName', 'stateName']
        },
    ]
  }
);

module.exports = City;
