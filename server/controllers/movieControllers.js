const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Admin = require("../models/Admin");
const Movie = require("../models/Movie");
const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "token not found" });
  }
  let adminId;
  // ==============================VERTFY_TOKEN========================
  jwt.verify(extractedToken, process.env.JWT_SECRET, (error, decrypted) => {
    if (error) {
      return res.status(400).json({ message: `${error.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });
  // ==============================CREATE_NEW_MOBVIE=====================
  const {
    title,
    description,
    actors,
    releaseDate,
    posterUrl,
    featured,
    vote_average,
    poster_path,
    tagline,
    runtime,
  } = req.body;
  if (
    (!poster_path && poster_path.trim() === "",
    vote_average && vote_average.trim() === "",
    tagline && tagline.trim() === "",
    runtime && runtime.trim() === "",
    !title &&
      title.trim() === "" &&
      !description &&
      description.trim() === "" &&
      !actors &&
      actors.trim() === "" &&
      !releaseDate &&
      releaseDate.trim() === "" &&
      posterUrl.trim() === "" &&
      !posterUrl &&
      !featured &&
      featured.trim() === "")
  ) {
    return res.status(422).json({ message: "Invalid InputFeild" });
  }
  let movie;
  try {
    movie = new Movie({
      title,
      description,
      actors,
      vote_average,
      poster_path,
      releaseDate: new Date(`${releaseDate}`),
      posterUrl,
      featured,
      tagline,
      runtime,
      admin: adminId,
    });

    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({ session });
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });
    await session.commitTransaction();
    // movie = await movie.save();
  } catch (error) {
    return console.log(error);
  }
  if (!movie) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(201).json({ movie });
};
// {===========================================================GET_MOVIE===============================}
const getMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find();
  } catch (error) {
    return console.log(error);
  }
  if (!movies) {
    return res.status(500).json({ message: "Movie Creation Failed" });
  }
  return res.status(200).json({ movies });
};
// {===========================================================GET_MOVIE_BY_ID===============================}
const getMoviebyID = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movie.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!movie) {
    return res.status(404).json({ message: "Invalid Movie Id" });
  }
  return res.status(200).json({ movie });
};
module.exports = { addMovie, getMovies, getMoviebyID };
