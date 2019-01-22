'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('animals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      species_name: {
        type: Sequelize.STRING
      },
      scientific_name: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT
      },
      extinct: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('animals');
  }
};