const { Op } = require("sequelize");
const Team = require("../models").Team;
const Team_Player = require("../models").Team_Player;
const Player = require("../models").Player;

/*** TEAMS ***/
exports.getTeams = async (req, res) => {
  try {
    const result = await Team.findAll();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.addTeam = async (req, res) => {
  try {
    const result = await Team.create(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.modifyTeam = async (req, res) => {
    try {
      const teamId = req.params.team_id;
      const result = (await Team.findAll({ where: { id: teamId }})).pop();
      result.name = req.body.name;
      result.color = req.body.color;
      result.save();
      res.send(result);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  }

exports.removeTeam = async (req, res) => {
  try {
    const teamId = req.params.team_id;
    const result = (await Team.findAll({ where: { id: teamId }})).pop();
    result.destroy();
    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

/*** TEAMS PLAYERS ***/
exports.getTeamPlayers = async (req, res) => {
  try {
    const onlyLeader = "leader" in req.query;
    const isResponseExtended = "extended" in req.query;
    let result = [];
    let options = {};

    if (isResponseExtended)
      options.include = [Player];

    if (onlyLeader)
      result = await Team_Player.findAll({
        where: {
          is_leader: { [Op.eq]: true }
        },
        ...options
      });
    else
      result = await Team_Player.findAll(options);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.addTeamPlayer = async (req, res) => {
  try {
    const teamId = req.params.team_id;
    const { players, leader } = req.body;
    const result = [];
    for (player of players)
      result.push(await Team_Player.create({
        player_id: player,
        team_id: teamId,
        is_leader: player == leader
      }));
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.removeTeamPlayer = async (req, res) => {
  try {
    const teamId = req.params.team_id;
    const playerId = req.params.player_id;
    const result = (await Team_Player.findAll({
      where: {
        team_id: teamId,
        player_id: playerId
      }
    })).pop();
    result.destroy();
    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}