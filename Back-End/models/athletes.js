"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Athletes extends Model {
    static associate(models) {
      //--------Relaciones-------//
      //Belongs To
      this.belongsTo(models.Addresses, { foreignKey: "address_id" });
      this.belongsTo(models.Locations, { foreignKey: "location_id" });
      //Has many
      this.hasMany(models.Athlete_records, { foreignKey: "athlete_id" });
      this.hasMany(models.Comments_by_incidents, { foreignKey: "athlete_id" });
      this.hasMany(models.Incidents, { foreignKey: "athlete_id" });
      this.hasMany(models.Parents, { foreignKey: "athlete_id" });
      //Belongs To Many
      this.belongsToMany(models.Shirt_sizes, { through: "Athlete_sizes", foreignKey: "athlete_id" });
      this.belongsToMany(models.Shoe_sizes, { through: "Athlete_sizes", foreignKey: "athlete_id" });
    }
    
  }
  Athletes.init(
    {
      athlete_name: { 
        type: DataTypes.STRING, 
        allowNull:false 
      },
      athlete_first_lastname: { 
        type: DataTypes.STRING, 
        allowNull:false 
      },
      athlete_second_lastname: { 
        type: DataTypes.STRING, 
        allowNull:false 
      },
      birthday: { 
        type: DataTypes.STRING, 
        allowNull:false 
      },
      nationality:{ 
        type: DataTypes.STRING, 
        allowNull:false 
      },
      gender:{ 
        type: DataTypes.STRING, 
        allowNull:false 
      },
      mail: { 
        type: DataTypes.STRING, 
        allowNull:false ,
        unique:true
      },
      password: { 
        type: DataTypes.STRING, 
        allowNull:false ,
      },
      phone:{ 
        type: DataTypes.STRING, 
        allowNull:false,
        unique:true
      },
      blood_type: { 
        type: DataTypes.STRING, 
        allowNull:false 
      },
      address_id: { 
        type: DataTypes.INTEGER, 
        allowNull:false,
        references:{
          model:"Addresses",
          key:"id",
        },
      },
      dominant_side:{ 
        type: DataTypes.STRING, 
        allowNull:false 
      },
      education_entity: { 
        type: DataTypes.STRING, 
        allowNull:false 
      },
      actual_grade:{ 
        type: DataTypes.STRING, 
        allowNull:false 
      },
      addition_date: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
      },
      location_id:{ 
        type: DataTypes.INTEGER, 
        allowNull:false,
        references:{
          model:"Locations",
          key:"id"
        }
      },
      athlete_status:{ 
        type: DataTypes.STRING, 
        allowNull:false 
      },
    },
    {
      sequelize,
      modelName: "Athletes",
    }
  );
  return Athletes;
};
