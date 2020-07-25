'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {});
  Game.associate = function(models) {
    this.hasMany(models.Match, {foreignKey: "id" });
  };
  return Game;
};