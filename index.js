/*jshint node: true */

var express = require('express');
var app = express();
app.set('view engine','ejs');
var ejs = require('ejs');
var path = require('path');
app.set('port', (process.env.PORT || 5000));


app.get("/index.js", function (req, res) {
    res.render('index.ejs');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});