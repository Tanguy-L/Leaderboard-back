const controllers = require("../controllers/rules");

const { Router } = require("express");
const rulesRouter = module.exports = Router();

rulesRouter.get("/", controllers.getRules);
rulesRouter.post("/", controllers.addRule);
rulesRouter.put("/:rule_id", controllers.modifyRule);
rulesRouter.delete("/:rule_id", controllers.removeRule);
