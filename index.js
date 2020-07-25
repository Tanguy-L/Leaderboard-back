const { version } = require("./package.json");
const bodyParser = require('body-parser');
const express = require("express");
const app = express();

const playersRouter = require("./routes/players");
const matchesRouter = require("./routes/matches");
const teamsRouter = require("./routes/teams");
const usersRouter = require("./routes/users");
const gamesRouter = require("./routes/games");
const rulesRouter = require("./routes/rules");

app.use(bodyParser.json());

app.get("/", (req, res) => {
    const { version } = require("./package.json");
    res.end("PLG LAN Leaderboard API v" + version, 200);
});

app.use("/players", playersRouter);
app.use("/matches", matchesRouter);
app.use("/teams", teamsRouter);
app.use("/users", usersRouter);
app.use("/games", gamesRouter);
app.use("/rules", rulesRouter);

app.listen(3000, "127.0.0.1", () => {
    console.log(`[SERVER] HTTP server listening at http://127.0.0.1:3000 in ${process.env.NODE_ENV} mode`);
})