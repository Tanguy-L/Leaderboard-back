'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      end_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      game: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Games",
          key: "id"
        }
      },
      rule: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Rules",
          key: "id"
        }
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
    return queryInterface.dropTable('Matches');
  }
};