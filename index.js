var express = require("express");
var app     = express();
var fs      = require('fs');
var path    = require("path");
var bodyParser = require('body-parser');

const dummyFile = 'dummyEmail.mjml';

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

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

app.post('/template', (req, res) => {
  let file;
  let newEmail;
  let emailHTML;
  const template = req.template || 'basic';

  if (template === 'basic') {
    file = getFile('index.mjml');
  }

  newEmail = insertDynamicValues(file, req.body);

  makeDummyFile(newEmail);

  execSync(cmd, options);

  emailHTML = getFile('testemail.html');

  res.send(emailHTML);
});

// Returns the template MJML file
function getFile(name) {
  return fs.readFileSync(name, 'utf-8');
}

// Inserts dynamic email values into the template MJML file
function insertDynamicValues(template, data) {
  const paragraphs = data.body.map((paragraph) => {
    return '<mj-text>' + paragraph + '</mj-text>';
  });

  // Hero Image
  template = template.replace('{{HERO}}', data.header);

  template = template.replace('{{BODY}}', paragraphs);

  template = template.replace('{{FOOTER IMAGE}}', makeFooter(data.footerImage));

  template = template.replace('{{FOOTER TEXT}}', data.footerText);

  template = template.replace('{{FOOTER FONT COLOR}}', data.footerColor);

  return template;
}

// Creates a new MJML file with dynamic values
function makeDummyFile(email) {
  // 'w' flag will force the file to be empty
  // fs.openSync(__dirname + dummyFile, 'w');

  fs.writeFileSync(dummyFile, email, 'utf-8');
}

function makeFooter(link) {
  return `<mj-section>
  <mj-column>
    <mj-image href="" target="_blank" mj-class="no-padding" src="${link}" alt="" />
  </mj-column>
</mj-section>`
}