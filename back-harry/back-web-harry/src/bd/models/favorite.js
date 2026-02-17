'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Favorite.init({
    name: DataTypes.STRING,
    house: DataTypes.STRING,
    wand: DataTypes.JSONB,
    image: DataTypes.STRING,
    ancestry: DataTypes.STRING,
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // 🔥 OBLIGATORIO
      primaryKey: true,
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },


  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};