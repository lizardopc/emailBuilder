var express = require("express");
var app     = express();
var fs      = require('fs');
var path    = require("path");

app.listen(3000, () => console.log('Example app listening on port 3000!'));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/styles.css'));
});

app.get('/js/main.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/main.js'));
});

app.get('/js/EmailBuilder.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/EmailBuilder.js'));
});

app.get('/js/Toolbar.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/Toolbar.js'));
});

app.get('/js/HTMLRenderer.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/HTMLRenderer.js'));
});

app.get('/js/Controller.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/Controller.js'));
});