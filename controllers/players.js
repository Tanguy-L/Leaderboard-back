const { Op } = require("sequelize");
const User = require("../models").User;
const Player = require("../models").Player;

/*** USERS ***/
exports.getPlayers = async (req, res) => {
  try {
    const includeOwned = !("notOwned" in req.query);
    const isResponseExtended = "extended" in req.query;
    let result = [];
    let options = {};

    if (isResponseExtended)
      options.include = [User];

    if (includeOwned)
      result = await Player.findAll(options);
    else
      result = await Player.findAll({
        where: {
          user: { [Op.eq]: null }
        }
      });

    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.addPlayer = async (req, res) => {
  try {
    const result = await Player.create(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.removePlayer = async (req, res) => {
  try {
    const playerId = req.params.player_id;
    const result = (await Player.findAll({ where: { id: playerId }})).pop();
    result.destroy();
    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}