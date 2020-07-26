const User = require("../models").User;
const Player = require("../models").Player;

/*** USERS ***/
exports.getUsers = async (req, res) => {
  try {
    const result = await User.findAll();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

exports.connectUser = async (req, res) => {
  try {
    const login = req.body.login;
    const password = req.body.password;
    const result = await User.findOne({ where: { login, password } });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

exports.addUser = async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

exports.modifyUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const result = (await User.findAll({ where: { id: userId } })).pop();
    result.login = req.body.login;
    result.password = req.body.password;
    result.is_admin = req.body.is_admin;
    result.save();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

exports.removeUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const result = (await User.findAll({ where: { id: userId } })).pop();
    result.destroy();
    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

/*** USERS PLAYER ***/
exports.getUserPlayer = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const result = await Player.findAll({
      where: { user: userId },
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

exports.addUserPlayer = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const playerId = req.params.player_id;
    const result = (await Player.findAll({ where: { id: playerId } })).pop();
    result.user = userId;
    result.save();
    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

exports.removeUserPlayer = async (req, res) => {
  try {
    const userId = req.param.user_id;
    const result = (
      await Player.findAll({
        where: { user: userId },
      })
    ).pop();
    result;
    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
