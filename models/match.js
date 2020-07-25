'use strict';
module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    start_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
    end_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
    game: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    rule: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {});
  Match.associate = function(models) {
    this.belongsTo(models.Rule, { foreignKey: "rule"});
    this.belongsTo(models.Game, { foreignKey: "game"});
    this.hasMany(models.Match_Participant, { foreignKey: "match_id" })
  };
  return Match;
};