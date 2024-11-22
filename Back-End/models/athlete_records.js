"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Athlete_records extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Belongs To
      this.belongsTo(models.Athletes, { foreignKey: "athlete_id" });
    }
    
  }
  Athlete_records.init(
    {
      folder_id: {
        type:DataTypes.STRING,
        allowNull:false,
      },
      file_name:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      file_url:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      athlete_id: {
        type:DataTypes.STRING,
        allowNull:false,
        references:{
          model:"Athletes",
          key:"id",
        },
      },
    },
    {
      sequelize,
      modelName: "Athlete_records",
    }
  );
  return Athlete_records;
};
