"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Parents extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Belongs To
      this.belongsTo(models.Athletes, { foreignKey: "athlete_id" });
    }
    
  }
  Parents.init(
    {
      parent_name: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      parent_first_lastname:{
        type: DataTypes.STRING,
        allowNull:false,
      },
      parent_second_lastname:{
        type: DataTypes.STRING,
        allowNull:false,
      },
      parent_phone:{
        type: DataTypes.STRING,
        allowNull:false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      athlete_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:"Athletes",
          key:"id",
        },
      },
    },
    {
      sequelize,
      modelName: "Parents",
    }
  );
  return Parents;
};
