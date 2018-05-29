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

app.use('/js/', express.static(__dirname + '/js/'));