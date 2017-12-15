/*jshint node: true */

var express = require('express');
var app = express();
app.set('view engine','ejs');
var ejs = require('ejs');
var path = require('path');
var pg = require('pg');
app.set('port', (process.env.PORT || 5000));
//  LOCALLY debtless, tag, ONLINE stocks, tags

app.get("/index.js", function (req, res) {
    var client = new pg.Client(process.env.DATABASE_URL);
    client.connect();
    client.query("SELECT * FROM stocks", function(err, result) {
        if(err) {
            console.error(err);
        } else {
            res.render('index.ejs', {stocks : result.rows});
        }
    });
    //res.render('index.ejs', {stocks : result.rows});
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});