const Rule = require("../models").Rule;

exports.getRules = async (req, res) => {
  try {
    const result = await Rule.findAll();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.addRule = async (req, res) => {
  try {
    const result = await Rule.create(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.modifyRule = async (req, res) => {
  try {
    const ruleId = req.params.rule_id;
    const result = (await Rule.findAll({ where: { id: ruleId }})).pop();
    result.win = req.body.win;
    result.lost = req.body.lost;
    result.equality = req.body.equality;
    result.save();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

exports.removeRule = async (req, res) => {
  try {
    const ruleId = req.params.rule_id;
    const result = (await Rule.findAll({ where: { id: ruleId }})).pop();
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