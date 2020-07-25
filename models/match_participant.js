'use strict';
module.exports = (sequelize, DataTypes) => {
  const Match_Participant = sequelize.define('Match_Participant', {
    match_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    team_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    is_winner: {
      defaultValue: 0,
      type: DataTypes.BOOLEAN
    }
  }, {});
  Match_Participant.associate = function(models) {
    this.belongsTo(models.Team, { foreignKey: "team_id" });
    this.belongsTo(models.Team, { foreignKey: "team_id" });
  };
  return Match_Participant;
};