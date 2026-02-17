module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Favorites", "characterId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Characters",
        key: "id"
      },
      onDelete: "CASCADE"
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Favorites", "characterId");
  }
};
