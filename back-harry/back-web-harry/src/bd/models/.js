'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }.init({
    name: DataTypes.STRING,
    house: DataTypes.STRING,
    wand: DataTypes.JSONB,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    ancestry: DataTypes.STRING
  }, {
    sequelize,
    modelName: '',
  });
  return;
};