"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Athlete_sizes extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Belongs To
      this.belongsTo(models.Athletes, { foreignKey: "athlete_id" });
      this.belongsTo(models.Shirt_sizes, { foreignKey: "shirt_sizes_id" });
      this.belongsTo(models.Shoe_sizes, { foreignKey: "shoe_sizes_id" });
    }
    
  }
  Athlete_sizes.init(
    {
      shoe_sizes_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:"Shoe_sizes",
          key:"id"
        }
      },

      shirt_sizes_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:"Shirt_sizes",
          key:"id"
        }
      },
      athlete_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
          model:"Athletes",
          key:"id"
        }
      },
    },
    {
      sequelize,
      modelName: "Athlete_sizes",
    }
  );
  return Athlete_sizes;
};
