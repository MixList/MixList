'use strict'

const jwt = require('jsonwebtoken')
const hashing = require('../helpers/hashingCompare')

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username cannot Empty.'
        },
        notNull: {
          args: true,
          msg: 'Username cannot Null.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot Empty.'
        },
        notNull: {
          args: true,
          msg: 'Email cannot Null.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot Empty.'
        },
        notNull: {
          args: true,
          msg: 'Password cannot Null.'
        }
      }
    }
  }, {
      hooks: {
        beforeSave(instance, options) {
          const hashingPass = hashing.hashing(instance.password)
          instance.password = hashingPass
        }
    },
    sequelize
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Playlist, {foreignKey: "UserId"})
  };
  return User;
};