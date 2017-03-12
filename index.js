const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const pgp = require('pg-promise')();
const sentenceChecker = require('./sentence-checker');
const passport = require('passport'); ////***important ////handles login authentication for us
const session = require('express-session'); ////***important    ////session keeps track of cookie
const logger = require('morgan');
const flash = require('connect-flash');


const app = express();
const PORT = process.env.PORT || 8080;

let myResults = {};
let keywords = [];
let yes;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
///////////
//////////////
//////////////////////
////////////////

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());

app.use(passport.session());

app.use(logger('dev'));  ////morgan

app.use(bodyParser.urlencoded({ extended: true}));

app.use(cookieParser());

app.use(flash());  ////popup for user

// ============================================================
// Configure passport for a local signup strategy:

// We're going to need the User model
const User = require('./models/user');
// And we're going to need the Local Strategy for this kind of registration
const LocalStrategy = require('passport-local').Strategy;  ////deals with various log in attemtps. maintanceof user accounts
// We'll also need bcrypt to authenticate uses without storing their
// passoword _anywhere_...


// Given user information called "user", what do we want to serialize
// to the session?
passport.serializeUser((user, done) => {
  console.log('----------------------------------------');
  console.log('in passport.serializeUser callback');
  console.log('user: ');
  console.log(user);

  done(null, user);
});

// Given an object representing our user (obtained from the session),
// how shall we define any other user information we'll need in our
// routes, conveniently accessible as req.user in routes?
passport.deserializeUser((userObj, done) => {  ////done is a passport method (letsus no where finish)
  console.log('----------------------------------------');
  console.log('in passport.deserializeUser callback');
  console.log('userObj: ');
  console.log(userObj);

  User
    .findByEmail(userObj.email) ////find email
    .then((user) => done(null, user))
    .catch((err) => {
      console.log('ERROR:', err);
      return done(null, false);
    });
});

passport.use(
  'local-signup',
  new LocalStrategy(
    {

      usernameField: 'user[email]',
      passwordField: 'user[password]',
      passReqToCallback: true
    },
    (req, email, password, done) => { ////if usr signs up correctly...call user.create.... done(user)
      User
  .create(req.body.user)
  .then((user) => {
    return done(null, user);
  })
  .catch((err) => {
    console.log('ERROR:', err);
    return done(null, false);
  });
    })
);

passport.use(
  'local-login',
  new LocalStrategy(
    {

      usernameField: 'user[email]',
      passwordField: 'user[password]',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User
        .findByEmail(email)
        .then((user) => {
          if (user) {

            const isAuthed = bcrypt.compareSync(password, user.password_digest); /////compares password with login password

            if (isAuthed) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          } else {
            return done(null, false);
          }
        });
    })
);

// END OF PASSPORT SETUP SECTION
////http://passportjs.org/
////// https://github.com/jaredhanson/passport-local
// ============================================================




app.use('/users', require('./controller/users'));

app.get('/', (req, res) => {
  res.render('./users/login')
});

// app.get('/results', (req, res) => {
//         res.render('./results')
// })

///////////////////


app.post('/api', (req, res) => {
  // let myData = req.body.text;

  let myData = (req.body.url == undefined) ? req.body.text : req.body.url;
  // console.log("this is data.text ", myData)
  // console.log("this is testing data.url >> ", myDat)
 // const pry = require('pryjs')
 //              eval(pry.it);

    let params = {};
      params.extract = "entities, keywords, relations, title";
      params.url = myData;
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

                console.log(JSON.stringify(response, null, 2))
              // console.log("myCHecker>>>>", sentenceChecker);
          //    console.log(response.keywords);

               yes = new sentenceChecker(response);    ///// yes is global var

              //  const pry = require('pryjs')
             // eval(pry.it);

          //    console.log("*******************************", reqData)

              // console.log(JSON.stringify(response, null, 2));
                  yes.Mapping();
                  yes.combineData();
                  yes.keyPush();

                   console.log("////////////////////////KEYWORDS//////////////////////////////////")
                console.log(yes.keywordsText);
                //    console.log("////////////////////////////////////////////////////RELATIONSSSS/////")
                // console.log(yes.relations);

                console.log("////////////////////////////////////////////////////SENTENCESSSS/////")
                console.log(yes.sentences);


                res.send({combinedText: yes.combinedSentences, title: yes.title, keywords: yes.keywordsText});

            }
      });

      // res.render('index');
      // .then(data => data.json())
      // .then(data => res.json(data));

// send(myData).then(data => res.json(data));
// res.json(send(myData));

})
///////////// ///////////////////////////------------- end of post




////////////// have to take response.relations
//////// from there loop through each and pick out the"subject.text" and "action.text" and "object.text";
/// create a condition to make sure no two senteces are the same
////// ex::: subject.text === subject.text    >>>> true //// this cant happen




app.post('/bookmark', (req, res) => {
          const bookmark = req.body;
          console.log("this is the bookmark >>>  >>> ", bookmark);
          let room = Object.keys(bookmark);
          let myRoom = [];

            room.forEach((key) => {
                myRoom.key = bookmark[key]
            })
            myRoom.title = bookmark.title;
            myRoom.website = yes.website;

            console.log(myRoom);    /////// got the data back from user saved summary//// object containes "title: title" and "key: text"

             //   const pry = require('pryjs')
             // eval(pry.it);
})





app.listen(PORT, () => console.log('Server is listening on port', PORT));







// node-sdk/examples/alchemy_language.v1.js
