"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Files extends Model {
    static associate(models) {
   }
    
  }
  Files.init(
    {
      file_name: {
        type:DataTypes.STRING,
        allowNull:false,
      },
      file_path: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
      },
    
    },
    {
      sequelize,
      modelName: "Files",
    }
  );
  return Files;
};
