'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FavoriteDb extends Model {

    static associate(models) {
      FavoriteDb.belongsTo(models.Characters, {
        foreignKey: 'characterId'
      });
    }


  }
  FavoriteDb.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Characters', key: 'id' }
    },
  }, {
    sequelize,
    modelName: 'FavoriteDb',
    tableName: 'FavoriteDb',
    freezeTableName: true,
  });
  return FavoriteDb;
};
