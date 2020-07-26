const controllers = require("../controllers/users");

const { Router } = require("express");
const usersRouter = (module.exports = Router());

usersRouter.get("/", controllers.getUsers);
usersRouter.post("/", controllers.addUser);
usersRouter.post("/connect", controllers.connectUser);
usersRouter.put("/:user_id", controllers.modifyUser);
usersRouter.delete("/:user_id", controllers.removeUser);

usersRouter.get("/:user_id/player", controllers.getUserPlayer);
usersRouter.post("/:user_id/player/:player_id", controllers.addUserPlayer);
usersRouter.delete("/:user_id/player", controllers.removeUserPlayer);
