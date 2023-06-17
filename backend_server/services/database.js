const Sequelize = require('sequelize');
const keys =  require('../config/keys');

//Database connection instance (DAO)
const sequelize = new Sequelize(keys.pgDatabase, keys.pgUser, keys.pgPassword, {
    host: keys.pgHost,
    port: keys.pgPort,
    dialect: 'postgres',
    logging: true
  })

module.exports = sequelize;