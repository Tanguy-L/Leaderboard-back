const controllers = require("../controllers/teams");

const { Router } = require("express");
const teamsRouter = module.exports = Router();

teamsRouter.get("/", controllers.getTeams);
teamsRouter.post("/", controllers.addTeam);
teamsRouter.put("/:team_id", controllers.modifyTeam);
teamsRouter.delete("/:team_id", controllers.removeTeam);

teamsRouter.get("/:team_id/players", controllers.getTeamPlayers);
teamsRouter.post("/:team_id/players", controllers.addTeamPlayer);
teamsRouter.delete("/:team_id/players/:player_id", controllers.removeTeamPlayer);
