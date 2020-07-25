'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    color: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {});
  Team.associate = function(models) {
    this.hasMany(models.Team_Player, { foreignKey: "team_id"});
    this.hasMany(models.Match_Participant, { foreignKey: "team_id"});
  };
  return Team;
};