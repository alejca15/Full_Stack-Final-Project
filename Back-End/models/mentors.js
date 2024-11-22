"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Mentors extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Has many
      this.hasMany(models.Comments_by_incidents, { foreignKey: "mentor_id" });
      //Belongs To Many
      this.belongsToMany(models.Athletes, { through: "mentors_by_athlete", foreignKey: "mentor_id" });
    }
    
  }
  Mentors.init(
    {
      mentor_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mentor_lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Locations",
          key: "id",
        },
      },
      mentor_mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      mentor_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Mentors",
    }
  );
  return Mentors;
};
