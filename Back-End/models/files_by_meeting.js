"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Files_by_meeting extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Belongs To
      this.belongsTo(models.Meetings, { foreignKey: "meeting_id" });
    }
    
  }
  Files_by_meeting.init(
    {
      file_name: {
        type:DataTypes.STRING,
        allowNull:false,
      },
      file_url: {
        type:DataTypes.STRING,
        allowNull:false,
      },
      meeting_id: {
        type:DataTypes.STRING,
        allowNull:false,
        references:{
          model:"Meetings",
          key:"id",
        },
      },
    },
    {
      sequelize,
      modelName: "Files_by_meeting",
    }
  );
  return Files_by_meeting;
};
