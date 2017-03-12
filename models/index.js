const pgp = require('pg-promise')();
const db = pgp(process.envDATABASE_URL || 'postgres://student_22@localhost:5432/summary_db_test')
const AlchemyLanguage = require('watson-developer-cloud');
const alchemy = AlchemyLanguage.alchemy_language({
      url: "https://gateway-a.watsonplatform.net/calls",
      api_key: "cc8d40dfa1d0313d321cd25a50c15f1a559fd6f5"
});



const Sum = {};

Sum.createUser = () => {

}


Sum.createBookmark = (title, summary, website, user_id) => {
        return db.one('INSERT INTO movies(title, summary, website, user_id) VALUES ($1, $2, $3, $4) returning *', [title, summary, website, user_id])
}


Sum.bookmarkSummary = () => {
        return db.one('INSERT INTO movies(data, bookmark_id) VALUES ($1, $2) returning *', [data, bookmark_id])
}


Sum.retrieveBookmarks = (rams) => {

      let bookmarks = db.any("SELECT * FROM Bookmarks");
      return race;
};


///////////////////////////////   api ^^
/////////////////////////////


module.exports = Sum;
