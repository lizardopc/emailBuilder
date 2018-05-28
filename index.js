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

// Content
app.get('/js/Content/Content.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/Content/Content.js'));
});

app.get('/js/Content/ContentFactory.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/Content/ContentFactory.js'));
});

app.get('/js/Content/Image.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/Content/Image.js'));
});

// Fields
app.get('/js/Fields/AlignField.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/Fields/AlignField.js'));
});

app.get('/js/Fields/TextField.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/Fields/TextField.js'));
});

app.get('/js/Fields/LinkField.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/Fields/LinkField.js'));
});

app.get('/js/Fields/PaddingField.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/Fields/PaddingField.js'));
});

app.get('/js/Fields/SizeField.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/Fields/SizeField.js'));
});