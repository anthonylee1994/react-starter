const path = require("path");
const express = require("express");
const proxy = require("express-http-proxy");

const app = express();

app.use("/api", proxy("localhost:8080", {
    proxyReqPathResolver: function(req) {
        return require("url").parse(req.url).path;
    },
}));

app.use(express.static(path.join(__dirname, "public")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Listening at 3000");
});
