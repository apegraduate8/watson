const pgp = require('pg-promise')();
const AlchemyLanguage = require('watson-developer-cloud');
const alchemy = AlchemyLanguage.alchemy_language({
      url: "https://gateway-a.watsonplatform.net/calls",
      api_key: "cc8d40dfa1d0313d321cd25a50c15f1a559fd6f5"
});

const db = pgp(alchemy);

const myShit = {};

myShit.retrieve = (rams) => {
    alchemy.combined(rams, (err, response) => {
            if(err){
              console.log("this is the error " + err)
            }
            else {
              return response
              // console.log("this is back ->> ", back);
            }
      })
};



module.exports = myShit;
