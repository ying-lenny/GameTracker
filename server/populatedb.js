#! /usr/bin/env node

console.log(
  'This script populates some test games, and studios to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Game = require("./models/game");
const Studio = require("./models/studio");

const games = [];
const studios = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createStudios();
  await createGames();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// Create the database model for the Studios
async function studioCreate(studio_name, staff_count, location, website) {
  studioDetail = { studio_name, staff_count, location, website }
  const studio = new Studio(studioDetail);

  await studio.save();
  studios.push(studio);
  console.log(`Added Studio: ${studio_name}`);
}

// Create the database model for the Games
async function gameCreate(title, studio, summary, rating, release_date, status) {
  gameDetail = {
    title: title,
    studio: studio,
    summary: summary,
    rating: rating,
  };

  if (release_date != false) gameDetail.release_date = release_date;
  if (status != false) gameDetail.status = status;

  const game = new Game(gameDetail);
  await game.save();
  games.push(game);
  console.log(`Added game: ${title}`);
}

async function createStudios() {
  console.log("Adding Studios");
  await Promise.all([
    studioCreate("Capcom", 3000, "Tokyo", "capcom.com"),
    studioCreate("Sony", 1264, "California", "sony.com"),
    studioCreate("New Blood", 12, "Remote", "newblood.com"),
  ]);
}

async function createGames() {
  console.log("Adding Games");
  await Promise.all([
    //* Capcom Games
    gameCreate(
      "Resident Evil",
      studios[0],
      "Enter the grandfather of survival horror",
      86,
      "1996-03-22",
      "Released"
    ),
    gameCreate(
      "Devil May Cry 5",
      studios[0],
      "Stylish character action game",
      100,
      "2019-03-08",
      "Released"
    ),
    gameCreate(
      "Ghost Trick: Phantom Detective",
      studios[0],
      "Supernatural puzzle-solving thriller",
      "",
      "2023-06-29",
      "Coming Soon"
    ),
    //* Sony
    gameCreate(
      "Marvel's Spiderman",
      studios[1],
      "Play as Spiderman",
      94,
      "2018-09-07",
      "Released"
    ),
    gameCreate(
      "Marvel's Spiderman 2",
      studios[1],
      "Play as 2 Spidermen",
      "",
      "2023-10-20",
      "Coming Soon"
    ),
        //* New Blood Interactive Games
    gameCreate(
      "ULTRAKILL",
      studios[2],
      "Genre-defining Fast-paced ultraviolent FPS",
      97,
      "2020-09-03",
      "Early Access"
    ),
    gameCreate(
      "Dusk",
      studios[2],
      "Another Fast-paced ultraviolent FPS",
      95,
      "2018-01-18",
      "Released"
    ),
    gameCreate(
      "FAITH: The unholy trinity",
      studios[2],
      "Retro religious survival horror",
      97,
      "2017-10-04",
      "Released"
    ),
  ]);
}