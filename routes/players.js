const controllers = require("../controllers/players");

const { Router } = require("express");
const playersRouter = module.exports = Router();

playersRouter.get("/", controllers.getPlayers);
playersRouter.post("/", controllers.addPlayer);
playersRouter.delete("/:player_id", controllers.removePlayer);
