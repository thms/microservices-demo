'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/database.json')[env];
var db        = {};

/* Get secrets from vault instead of config file */
// let options = {
//   apiVersion: 'v1', // default
//   endpoint: 'http://127.0.0.1:8200', // default
//   token: process.env.VAULT_TOKEN
// };
// process.env.DEBUG = 'node-vault'; // switch on debug mode
// var vault = require("node-vault")(options);
// vault.read('secret/user-service/db').then( secrets => {
//   console.log(secrets)
//   config = {
//         "username": secrets.data.username,
//         "password": secrets.data.password,
//         "database": secrets.data.database,
//         "host": "127.0.0.1",
//         "dialect": "mysql"
//       };
//       return(config)
//   }).then(config => {
//     console.log(config)
//   }).catch(error => {
//     console.log(error)
//   })

// async function getSecretsFromVault(vault) {
//   try {
//     let secrets = await vault.read('secret/user-service/db');
//     console.log(secrets)
//     let config = {
//           "username": secrets.data.username,
//           "password": secrets.data.password,
//           "database": secrets.data.database,
//           "host": "127.0.0.1",
//           "dialect": "mysql"
//       };
//       return(config);
//     } catch (error) {
//       console.log(error)
//       throw(error)
//     }
// }
// let config2 = getSecretsFromVault(vault);
// console.log(config2);
// This does not yet work, the thing does not wait for the promise to resolve.
/* End config from vault */

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
