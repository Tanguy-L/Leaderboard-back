const Match = require("../models").Match;
const Match_Participant = require("../models").Match_Participant;
const Game = require("../models").Game;
const Rule = require("../models").Rule;

/*** MATCHES ***/
exports.getMatches = async (req, res) => {
  try {
    const result = await Match.findAll();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.addMatch = async (req, res) => {
  try {
    const result = await Match.create(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.modifyMatch = async (req, res) => {
  try {
    const matchId = req.params.match_id;
    const result = (await Match.findAll({ where: { id: matchId }})).pop();
    result.start_at = req.body.start_at;
    result.end_at = req.body.end_at;
    result.game = req.body.game;
    result.rule = req.body.rule;
    result.save();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.removeMatch = async (req, res) => {
  try {
    const matchId = req.params.match_id;
    const result = (await Match.findAll({ where: { id: matchId }})).pop();
    result.destroy();
    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

/*** MATCH PARTICPANTS ***/
exports.getMatchParticpants = async (req, res) => {
  try {
    const matchId = req.params.match_id;
    const result = await Match_Participant.findAll({
      where: { match_id: matchId }
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.addMatchParticpant = async (req, res) => {
  try {
    const matchId = req.params.match_id;
    const { teams } = req.body;
    const result = [];
    for (team of teams)
      result.push(await Match_Participant.create({
        team_id: team,
        match_id: matchId
      }));
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.removeMatchParticpant = async (req, res) => {
  try {
    const teamId = req.params.team_id;
    const matchId = req.params.match_id;
    const result = (await Match_Participant.findAll({
      where: {
        team_id: teamId,
        match_id: matchId
      }
    })).pop();
    result.destroy();
    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

/*** MATCHES RESULT ***/
exports.getMatchResult = async (req, res) => {
  try {
    const matchId = req.params.match_id;
    const matchRule = (await Match.findAll({
      where: { id: matchId },
      include: [Rule]
    })).pop().dataValues.Rule.dataValues;
    const match_particpants = (await Match_Participant.findAll({
      where: { match_id: matchId }
    }));

    const winners = match_particpants.reduce((winners, team) => (winners += team.is_winner ? 1 : 0), 0);
    const result = match_particpants.map(team => ({
      team: team.team_id,
      score: winners == 1 ? (team.is_winner ? matchRule.win : matchRule.lost) : matchRule.equality,
      is_winner: team.is_winner
    }))

    res.send(winners != 0 ? result : 204);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.addMatchResult = async (req, res) => {
  try {
    const matchId = req.params.match_id;
    (await Match_Participant.findAll({
      where: {
        match_id: matchId,
        team_id: req.body.winners
      }
    })).forEach(team => {
      team.is_winner = true;
      team.save();
    });
    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

/*** MATCHES GAMES AND RULES ***/
exports.modifyMatchGame = async (req, res) => {
  try {
    const matchId = req.params.match_id;
    const gameId = req.params.game_id;
    const result = (await Match.findAll({ where: { id: matchId }})).pop();
    result.game = gameId;
    result.save();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.modifyMatchRule = async (req, res) => {
  try {
    const matchId = req.params.match_id;
    const ruleId = req.params.rule_id;
    const result = (await Match.findAll({ where: { id: matchId }})).pop();
    result.rule = ruleId;
    result.save();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}