"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Incidents extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Belongs To
      this.belongsTo(models.Athletes, { foreignKey: "athlete_id" });
      //Has many
      this.hasMany(models.Comments_by_incidents, { foreignKey: "incident_id" });
    }
    
  }
  Incidents.init(
    {
      incident_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      incident_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      incident_state: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      athlete_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Athletes",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Incidents",
    }
  );
  return Incidents;
};
