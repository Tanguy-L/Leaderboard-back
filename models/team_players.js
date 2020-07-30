'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team_Player = sequelize.define('Team_Player', {
    player_id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    team_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    is_leader: {
      defaultValue: 0,
      type: DataTypes.BOOLEAN
    }
  }, {});
  Team_Player.associate = function (models) {
    this.belongsTo(models.Player, { foreignKey: "player_id" });
    this.belongsTo(models.Team, { foreignKey: "team_id" });
  };
  return Team_Player;
};