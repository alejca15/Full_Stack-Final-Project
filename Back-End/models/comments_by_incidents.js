"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Comments_by_incidents extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Belongs To
      this.belongsTo(models.Incidents, { foreignKey: "incident_id" });
      this.belongsTo(models.Athletes, { foreignKey: "athlete_id" });
      this.belongsTo(models.Counselors, { foreignKey: "counselor_id" });
      this.belongsTo(models.Mentors, { foreignKey: "mentor_id" });
      this.belongsTo(models.Admins, { foreignKey: "admin_id" });
    }
    
  }
  Comments_by_incidents.init(
    {
      comment: {
        type:DataTypes.STRING,
        allowNull:false,
      },
      incident_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:"Incidents",
          key:"id",
        },
      },
      counselor_id: {
        type:DataTypes.INTEGER,
        allowNull:true,
        references:{
          model:"Counselors",
          key:"id",
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
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Admins",
          key: "id",
        },
      },
      athlete_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:"Athletes",
          key:"id",
        },
      },
    },
    {
      sequelize,
      modelName: "Comments_by_incidents",
    }
  );
  return Comments_by_incidents;
};
