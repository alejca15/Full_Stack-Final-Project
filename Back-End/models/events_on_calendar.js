"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Events_on_calendar extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Belongs To
      this.belongsTo(models.Workshops, { foreignKey: "workshop_id" });
      this.belongsTo(models.Meetings, { foreignKey: "meeting_id" });
    }
    
  }
  Events_on_calendar.init(
    {
      workshop_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Workshops",
          key: "id",
        },
      },
      meeting_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Meetings",
          key: "id",
        },
      },
      initial_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      final_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Events_on_calendar",
    }
  );
  return Events_on_calendar;
};
