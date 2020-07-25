const controllers = require("../controllers/Matches");

const { Router } = require("express");
const matchesRouter = module.exports = Router();

matchesRouter.get("/", controllers.getMatches);
matchesRouter.post("/", controllers.addMatch);
matchesRouter.put("/:match_id", controllers.modifyMatch);
matchesRouter.delete("/:match_id", controllers.removeMatch);

matchesRouter.get("/:match_id/participants", controllers.getMatchParticpants);
matchesRouter.post("/:match_id/participants/", controllers.addMatchParticpant);
matchesRouter.delete("/:match_id/participants/:team_id", controllers.removeMatchParticpant);

matchesRouter.post("/:match_id/game/:game_id", controllers.modifyMatchGame);
matchesRouter.post("/:match_id/rule/:rule_id", controllers.modifyMatchRule);