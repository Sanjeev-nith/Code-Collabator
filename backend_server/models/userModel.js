const { Model, DataTypes } = require('sequelize');
const sequelize = require('../services/database');

class User extends Model {}

User.init(
    {
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        profilePic: {
            type: DataTypes.STRING,
        },
    },
    {
      sequelize,
      modelName: 'users',
    }
  );
  
module.exports = User;
  