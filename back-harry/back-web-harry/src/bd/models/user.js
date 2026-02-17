'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    token: DataTypes.STRING,
    tokenExpires: {
      type: DataTypes.DATE,
      allowNull: true
    }


  },
    {
      sequelize,
      modelName: 'User',
    });
  return User;
};