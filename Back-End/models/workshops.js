"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Workshops extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Has many
      this.hasMany(models.Workshop_history, { foreignKey: "workshop_id" });
      this.hasMany(models.Events_on_calendar, { foreignKey: "workshop_id" });
    }
    
  }
  Workshops.init(
    {
      workshop_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      workshop_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      worksop_location: {
        type: DataTypes.STRING,
      },
      workshop_state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Workshops",
    }
  );
  return Workshops;
};
