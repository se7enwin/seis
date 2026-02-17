'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Characters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Characters.hasMany(models.FavoriteDb, {
        foreignKey: 'characterId'
      });


    }
  }
  Characters.init({
    name: DataTypes.STRING,
    house: DataTypes.STRING,
    wand: DataTypes.JSONB,
    image: DataTypes.BLOB,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    ancestry: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Characters',
    tableName: 'Characters',      // 🔑 CLAVE
    freezeTableName: true,        // 🔑 CLAVE
  });
  return Characters;
};