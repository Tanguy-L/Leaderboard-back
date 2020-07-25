'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    user: {
      allowNull: true,
      type: DataTypes.INTEGER,
    }
  }, {});
  Player.associate = function(models) {
    this.belongsTo(model.User, { foreignKey: "user" });
    this.hasOne(model.Team_Player, { foreignKey: "player_id" });
  };
  return Player;
};