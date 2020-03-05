'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Playlist extends Model {}
  

  Playlist.init({
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {sequelize});

  Playlist.associate = function(models) {
    // associations can be defined here
    Playlist.belongsTo(models.User, { foreignKey: "UserId"})
  };
  return Playlist;
};