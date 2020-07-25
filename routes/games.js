const controllers = require("../controllers/games");

const { Router } = require("express");
const gamesRouter = module.exports = Router();

gamesRouter.get("/", controllers.getGames);
gamesRouter.post("/", controllers.addGame);
gamesRouter.put("/:game_id", controllers.modifyGame);
gamesRouter.delete("/:game_id", controllers.removeGame);
