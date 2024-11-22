"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Shirt_sizes extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Belongs To Many
      this.belongsToMany(models.Athletes, { through: "Athlete_sizes", foreignKey: "shirt_sizes_id" });
    }
    
  }
  Shirt_sizes.init(
    {
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Shirt_sizes",
      tableName:"Shirt_sizes",
    }
  );
  return Shirt_sizes;
};