"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Locations extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Belongs To
      this.belongsTo(models.Addresses, { foreignKey: "address_id" });
      //Has many
      this.hasMany(models.Counselors, { foreignKey: "location_id" });
      this.hasMany(models.Athletes, { foreignKey: "location_id" });
    }
    
  }

  Locations.init(
    {
      location_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      location_contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          Model: "Addresses",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Locations",
    }
  );

  return Locations;
};
