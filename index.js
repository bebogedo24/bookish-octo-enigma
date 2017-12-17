/*jshint node: true */

var express = require('express');
var app = express();
app.set('view engine','ejs');
var ejs = require('ejs');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var async = require('async');
var pg = require('pg');

app.set('port', (process.env.PORT || 5000));

//  LOCALLY debtless, tag, ONLINE stocks, tags
//"export DATABASE_URL=postgres://ubuntu:ubuntu@localhost:5432/ubuntu"
app.get("/index.js", function (req, res) {
    var companies = [];
    async.series (
        [function(callback) {
            var client = new pg.Client(process.env.DATABASE_URL);
            client.connect();
            client.query("SELECT * FROM debtless limit 10", function(err, result) {
                if(err) {
                    console.error(err);
                } else {
                    var tags = result.rows;
                    tags.forEach(function(t)  {
                        request("http://www.nasdaq.com/symbol/" + t.tag, function (error, response, html) {
                            if (!error) {
                                var $ = cheerio.load(html);
                                var comp = {};
                                comp.tag = t.tag;
                                comp.price = $("#qwidget_lastsale").text();
                                companies.push(comp);
                                if (companies.length == tags.length) {
                                    callback();
                                }
                            } else {
                                console.log("error connecting");
                            }
                            
                        });
                    });
                }
            });
            
        }, 
         function() {
             
             console.log('here');
            res.render('index.ejs', {companies : companies});
        }]
    );

   
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});