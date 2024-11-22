"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Shoe_sizes extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Belongs To Many
      this.belongsToMany(models.Athletes, { through: "Athlete_sizes", foreignKey: "shoe_sizes_id" });
    }
    
  }
  Shoe_sizes.init(
    {
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Shoe_sizes",
      tableName:"Shoe_sizes",
    }
  );
  return Shoe_sizes;
};