'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    is_admin: {
      defaultValue: 0,
      type: DataTypes.BOOLEAN
    }
  }, {});
  User.associate = function(models) {
    this.hasOne(models.Player, { foreignKey: "user" });
  };
  return User;
};