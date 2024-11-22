'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Parents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parent_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      parent_first_lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      parent_second_lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      parent_phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      athlete_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"Athletes",
          key:"id",
        },
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
    await queryInterface.dropTable('Parents');
  }
};