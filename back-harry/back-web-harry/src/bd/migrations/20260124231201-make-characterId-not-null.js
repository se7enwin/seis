"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Favorites", "characterId", {
      type: Sequelize.INTEGER,
      allowNull: false
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Favorites", "characterId", {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
