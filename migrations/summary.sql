DROP DATABASE IF EXISTS summary_db_test;
DROP TABLE IF EXISTS Users CASCADE;

CREATE DATABASE  summary_db_test;

\c summary_db_test;


CREATE TABLE Users (
   id SERIAL PRIMARY KEY,
   email VARCHAR NOT NULL UNIQUE,
   password_digest VARCHAR NOT NULL,
   number_of_bookmarks INT,
   CHECK (number_of_bookmarks < 10)
 );

---https://www.w3schools.com/sql/sql_check.asp

CREATE TABLE   Bookmarks (
   id SERIAL PRIMARY KEY,
   title VARCHAR (256) NOT NULL,
   summary VARCHAR (256) NOT NULL,
   url VARCHAR (256) NOT NULL,
   User_id INTEGER REFERENCES Users(id) ON DELETE CASCADE NOT NULL
);


CREATE TABLE   Summaries (
   id SERIAL PRIMARY KEY,
   data VARCHAR (256) NOT NULL,
   bookmark_id INTEGER REFERENCES Bookmarks(id) ON DELETE CASCADE NOT NULL
);


