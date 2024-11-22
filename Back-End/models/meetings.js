"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Meetings extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Has many
      this.hasMany(models.Files_by_meeting, { foreignKey: "meeting_id" });
      this.hasMany(models.Events_on_calendar, { foreignKey: "meeting_id" });
    }
  }
  Meetings.init(
    {
      meeting_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      meeting_initial_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      meeting_final_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      meeting_URL: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Meetings",
    }
  );
  return Meetings;
};
