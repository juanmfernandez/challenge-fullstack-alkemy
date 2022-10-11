'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Budgets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Budgets.belongsTo(models.User, {
        as: 'User',
        foreignKey: 'idUser',
        targetKey: 'id'
      });
      Budgets.belongsTo(models.Category, {
        as: 'Category',
        foreignKey: 'idCategory',
        targetKey: 'id'
      });
    }
  }

  Budgets.init({
    amount: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    idCategory: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Budgets',
  });
  return Budgets;
};