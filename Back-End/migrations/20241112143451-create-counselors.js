'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Counselors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      counselor_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      counselor_first_lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      counselor_second_lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      counselor_mail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"Locations",
          key:"id",
        }
      },
      counselor_phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Counselors');
  }
};