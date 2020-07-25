const { version } = require("./package.json");
const bodyParser = require('body-parser');
const express = require("express");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    const { version } = require("./package.json");
    res.end("PLG LAN Leaderboard API v" + version, 200);
});

app.listen(3000, "0.0.0.0", () => {
    console.log(`[SERVER] HTTP server listening at http://127.0.0.1:3000 in ${process.env.NODE_ENV} mode`);
})