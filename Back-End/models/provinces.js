"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Provinces extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Has many
      this.hasMany(models.Cantons, { foreignKey: "province_id", as: "Cantons" });
      this.hasMany(models.Addresses, { foreignKey: "province_id", as: "Addresses" });
    }
  }
  Provinces.init(
    {
      province_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
    },
    {
      sequelize,
      modelName: "Provinces",
    }
  );
  return Provinces;
};
