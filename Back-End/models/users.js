"use strict";
const {  Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Users extends Model {
    static associate(models) {
      //Belongs to
      this.belongsTo(models.Counselors, { foreignKey: "counselor_id" });
      this.belongsTo(models.Admins, { foreignKey: "admin_id" });
      this.belongsTo(models.Athletes, { foreignKey: "athlete_id" });
      this.belongsTo(models.Mentors, { foreignKey: "mentor_id" });
    }
  }
  Users.init(
    {
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      counselor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Counselors",
          key: "id",
        },
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Admins",
          key: "id",
        },
      },
      athlete_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Athletes",
          key: "id",
        },
      },
      mentor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Mentors",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
