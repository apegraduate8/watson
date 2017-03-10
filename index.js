const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const User = require('./models');

const app = express();
const PORT = process.env.PORT || 8080;



let myResults = {};

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//////



app.get('/', (req, res) => {
  res.render('./index')
});

app.get('/results', (req, res) => {
        res.render('./results')
})

app.post('/api', (req, res) => {
  let myData = req.body.text;
console.log("app.post result  ", myData)

    let params = {};

      params.extract = "entities, keywords, relations";
      params.text = myData;
      User
        .retrieve(params)
        .then(data => res.json(data));

      // res.render('index');
      // .then(data => data.json())
      // .then(data => res.json(data));

// send(myData).then(data => res.json(data));
// res.json(send(myData));

})
///////////// end of post








app.listen(PORT, () => console.log('Server is listening on port', PORT));







// node-sdk/examples/alchemy_language.v1.js
