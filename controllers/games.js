const Game = require("../models").Game;

/*** USERS ***/
exports.getGames = async (req, res) => {
  try {
    const result = await Game.findAll();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.addGame = async (req, res) => {
  try {
    const result = await Game.create(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.modifyGame = async (req, res) => {
  try {
    const gameId = req.params.game_id;
    const result = (await Game.findAll({ where: { id: gameId }})).pop();
    result.name = req.body.name;
    result.image = req.body.image;
    result.save();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.removeGame = async (req, res) => {
  try {
    const gameId = req.params.game_id;
    const result = (await Game.findAll({ where: { id: gameId }})).pop();
    result.destroy();
    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

/*** USERS PLAYER ***/
exports.getUserPlayer = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const result = await Player.findAll({
      where: { user: userId }
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.addUserPlayer = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const playerId = req.params.player_id;
    const result = (await Player.findAll({ where: { id: playerId }})).pop();
    result.user = userId;
    result.save();
    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}


exports.removeUserPlayer = async (req, res) => {
  try {
    const userId = req.param.user_id;
    const result = (await Player.findAll({
      where: { user: userId }
    })).pop();
    result
    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}