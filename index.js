var express = require("express");
var app     = express();
var fs      = require('fs');
var path    = require("path");
var bodyParser = require('body-parser');

const dummyFile = 'dummyEmail.mjml';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin");
  next();
});

var execSync = require('child_process').execSync;

// Command to generate email HTML
var cmd = path.join(__dirname + '/node_modules/.bin/mjml ' + dummyFile + ' -o testemail.html');

var options = {
  encoding: 'utf8'
};

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/styles.css'));
});

app.post('/template', (req, res) => {
  const template = req.body.template;

  // Make MJML file with template
  fs.writeFileSync(dummyFile, template, 'utf-8');

  // Execute command on template file
  execSync(cmd, options);

  // Get HTML file and send it back
  const emailHTML = fs.readFileSync('testemail.html', 'utf-8');

  res.send(emailHTML);
});