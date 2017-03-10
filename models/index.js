const pgp = require('pg-promise')();
const AlchemyLanguage = require('watson-developer-cloud');
const alchemy = AlchemyLanguage.alchemy_language({
      url: "https://gateway-a.watsonplatform.net/calls",
      note: "It may take up to 5 minutes for this key to become active",
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
              return JSON.stringify(response, null, 2);
              // console.log("this is back ->> ", back);
            }
      })
};



module.exports = myShit;
