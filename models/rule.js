'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rule = sequelize.define('Rule', {
    win: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    lost: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    equality: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Rule.associate = function(models) {
    this.hasMany(models.Match, { foreignKey: "rule" });
  };
  return Rule;
};