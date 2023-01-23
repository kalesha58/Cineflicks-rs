const express = require("express");
const {
  addMovie,
  getMovies,
  getMoviebyID,
} = require("../controllers/movieControllers");
const movieRouter = express.Router();
movieRouter.post("/", addMovie);
movieRouter.get("/", getMovies);
movieRouter.get("/:id", getMoviebyID);
module.exports = movieRouter;
