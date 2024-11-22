"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Directions extends Model {
    static associate(models) {
      //--------Relaciones-------//
      this.hasMany(models.Addresses, { foreignKey: "direction_id" });
    }
    
  }
  Directions.init(
    {
      direction_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Directions",
      tableName:"Directions",
    }
  );
  return Directions;
};