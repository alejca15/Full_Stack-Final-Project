"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Workshop_history extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Belongs To
      this.belongsTo(models.Workshops, { foreignKey: "workshop_id" });
    }
    
  }
  Workshop_history.init(
    {
      workshop_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Workshops",
          key: "id",
        },
      },
      completation_date: {
        type:DataTypes.DATE,
        allowNull:false,
      },
    },
    {
      sequelize,
      modelName: "Workshop_history",
    }
  );
  return Workshop_history;
};
