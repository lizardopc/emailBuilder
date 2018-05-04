var express = require("express");
var app     = express();
var path    = require("path");

var execSync = require('child_process').execSync;
var cmd = path.join(__dirname + "/node_modules/.bin/mjml index.mjml -o testemail.html");

var options = {
  encoding: 'utf8'
};

console.log(execSync(cmd, options));


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
app.listen(3000, () => console.log('Example app listening on port 3000!'))