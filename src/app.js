const path = require("path");
const geolocation = require("../src/utils.js/geolocation");
const weather = require("../src/utils.js/weather");
const express = require("express");
const hbs = require("hbs");

const port = process.env.PORT || 3000;

const app = express();
//seting up hbs engine, and then point to the views folder path
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
//pointing out the static folder path
app.use(express.static(path.join(__dirname, "../static")));
//registering partials folder
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("", (req, res) => {
    res.render("index", {
        title: "Home",
        name: "sushant waghmare",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "sushant waghmare",
    });
});

app.get("/weather", (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: "please provide a address",
        });
    }
    geolocation(req.query.address, (err, geoOutput) => {
        if (err) {
            return res.send({
                error: err,
            });
        }

        weather(geoOutput[0], geoOutput[1], (err, weatherOutput) => {
            if (err) {
                return res.send({
                    error: err,
                });
            }
            res.send({
                forecast: weatherOutput,
                location: geoOutput[2],
                address: req.query.address,
            });
        });
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "sushant waghmare",
    });
});

app.get("/help/*", (req, res) => {
    res.render("404 page", {
        error: "help article not found.",
        name: "sushant waghmare",
    });
});

app.get("*", (req, res) => {
    res.render("404 page", {
        error: "404 page not found",
        name: "sushant waghmare",
    });
});

app.listen(port, () => {
    console.log("port is " + port);
});
