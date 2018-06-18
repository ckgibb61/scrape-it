const express = require("express");
// const mongojs = require("mongojs");

const request = require("request");
const cheerio = require("cheerio");

var app = express();

var path = require("path")
// var databaseUrl = "scrape-it";
// var collections = ["scrapedData"];

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/scrape-it");

// var db = mongojs(databaseUrl, collections);
// db.on("error", function (error) {
//     console.log("Database Error:", error);
// });

const article = require("./article");
const more = require("./public/app.js")

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/all", function (req, res) {
    console.log("all")
    article.find({}, function(err, stuff) {
        res.json(stuff);
    })
})


request("http://www.huffingtonpost.com", function (error, response, html) {

    var $ = cheerio.load(html);
    var results = [];

    $("div.card__headline__text").each(function (i, element) {
        // console.log('stupid');
        var link = $(element).parent().attr("href");
        var otherLink = $(element).parent().parent().parent().parent().parent().attr("href");
        var title = $(element).text();
        var val = $(element).text();

        article.create({
            title: title,
            link: link,
        }).then(function (thingSaved) {
            console.log(thingSaved)
            })
        // db.scrapedData.insert({
        //     title: title,
        //     link: link
        // })
    });
    // console.log(results);

})


app.listen(8080, function () {
    console.log("App running!");
});