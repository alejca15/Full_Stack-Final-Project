"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize) => {
  class Users extends Model {
    static associate(models) {
    }
  }
  Users.init(
    {
      email: {
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
