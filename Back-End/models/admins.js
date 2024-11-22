"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Admins extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Has many
      this.hasMany(models.Comments_by_incidents, { foreignKey: "mentor_id" });
    }
  }
  Admins.init(
    {
      admin_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin_lastname:{
        type: DataTypes.STRING,
        allowNull:false
      },
      admin_mail:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
      },
      admin_phone:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
      }
    },
    {
      sequelize,
      modelName: "Admins",
    }
  );
  return Admins;
};