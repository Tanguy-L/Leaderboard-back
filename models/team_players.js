'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team_Player = sequelize.define('Team_Player', {
    player_id: {
      allowNull: false,
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
  Team_Player.associate = function(models) {
    this.belongsTo(model.Player, { foreignKey: "player_id" });
    this.belongsTo(model.Team, { foreignKey: "team_id" });
  };
  return Team_Player;
};