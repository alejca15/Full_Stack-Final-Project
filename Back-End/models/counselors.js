"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Counselors extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Belongs To
      this.belongsTo(models.Locations, { foreignKey: "location_id" });
      //Has many
      this.hasMany(models.Comments_by_incidents, { foreignKey: "counselor_id" });
    }
    
  }
  Counselors.init(
    {
      counselor_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      counselor_first_lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      counselor_second_lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      counselor_mail: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique:true,
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Locations",
          key: "id",
        },
      },
      counselor_phone: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique:true,
      },
    },
    {
      sequelize,
      modelName: "Counselors",
    }
  );
  return Counselors;
};
