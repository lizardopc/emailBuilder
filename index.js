var express = require("express");
var app     = express();
var fs      = require('fs');
var path    = require("path");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); 

var execSync = require('child_process').execSync;

// Generate HTML
var cmd = path.join(__dirname + "/node_modules/.bin/mjml index.mjml -o testemail.html");

var options = {
  encoding: 'utf8'
};

//execSync(cmd, options);


app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

// Get email template and load template MJML file
app.post('/template', (req, res) => {
  let file;
  const template = req.template || 'basic';

  if (template === 'basic') {
    file = getTemplate('index');

    
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

// Returns the template MJML file
function getTemplate(name) {
  return fs.readFileSync(`${name}.mjml`, 'utf-8');
}