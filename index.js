const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const User = require('./models');
const sentenceChecker = require('./sentence-checker');
const myChecker = sentenceChecker.Results;

const app = express();
const PORT = process.env.PORT || 8080;



let myResults = {};
let keywords = [];

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
      params.username = "apegraduate8@gmail.com";
      params.password = "Horton14-16";
      console.log(params);
      // User
      //   .retrieve(params)
      // let risk = User.retrieve(params);
      //
const AlchemyLanguage = require('watson-developer-cloud');
const alchemy = AlchemyLanguage.alchemy_language({
      url: "https://gateway-a.watsonplatform.net/calls",
      api_key: "cc8d40dfa1d0313d321cd25a50c15f1a559fd6f5"
});

         alchemy.combined(params, (err, response) => {
            if(err){
              return console.log("this is the error " + err)
            }
            else {
             // let reqData = JSON.stringify(response, null, 2);

              //    const pry = require('pryjs')
              // eval(pry.it);


              // console.log("myCHecker>>>>", sentenceChecker);
          //    console.log(response.keywords);

              let yes = new sentenceChecker(response);

              //  const pry = require('pryjs')
             // eval(pry.it);

          //    console.log("*******************************", reqData)

              // console.log(JSON.stringify(response, null, 2));
                  yes.Mapping();

                  yes.combineData();
                // console.log("//////////////////////////////////////////////////////////")
                // console.log(yes.data)
                //  console.log("//////////////////////////////////////////////////////////")


                //    console.log("////////////////////////KEYWORDS//////////////////////////////////")
                // console.log(yes.keywords);
                //    console.log("////////////////////////////////////////////////////RELATIONSSSS/////")
                // console.log(yes.relations);

                //  console.log("////////////////////////////////////////////////////SENTENCESSSS/////")
                // console.log(yes.sentences);
                //  console.log("////////////////////////////////////////////////////SUBJECTS/////")
                // console.log(yes.subjectText);
                //    console.log("////////////////////////////////////////////////////ACTIONS/////")
                // console.log(yes.actionText);



                res.send(yes.combinedText);

            }
      });

      // res.render('index');
      // .then(data => data.json())
      // .then(data => res.json(data));

// send(myData).then(data => res.json(data));
// res.json(send(myData));

})
///////////// end of post

////////////// have to take response.relations
//////// from there loop through each and pick out the"subject.text" and "action.text" and "object.text";
/// create a condition to make sure no two senteces are the same
////// ex::: subject.text === subject.text    >>>> true //// this cant happen






app.listen(PORT, () => console.log('Server is listening on port', PORT));







// node-sdk/examples/alchemy_language.v1.js
