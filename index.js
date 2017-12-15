/*jshint node: true */

var express = require('express');
var app = express();
app.set('view engine','ejs');
var ejs = require('ejs');
var path = require('path');
var pg = require('pg');
app.set('port', (process.env.PORT || 5000));


app.get("/index.js", function (req, res) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM stocks', function(err, result) {
            done();
            if (err) {
                console.log(err);
            }
            else {
                res.render('index.ejs', {stocks : result.rows});
            }
        });
    });
    
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});