"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Mentors_by_athletes extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Belongs To
      this.belongsTo(models.Mentors, { foreignKey: "mentor_id" });
      this.belongsTo(models.Athletes, { foreignKey: "athlete_id" });
    }
    
  }
  Mentors_by_athletes.init(
    {
      mentor_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:"Mentors",
          key:"id",
        },
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
      modelName: "Mentors_by_athletes",
    }
  );
  return Mentors_by_athletes;
};
