const jwt = require("jsonwebtoken");
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
  const { title, description, actors, releaseDate, posterUrl, featured } =
    req.body;
  if (
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
    featured.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid InputFeild" });
  }
  let movie;
  try {
    movie = new Movie({
      title,
      description,
      actors,

      releaseDate: new Date(`${releaseDate}`),
      posterUrl,
      featured,
      admin:adminId,
    });
    movie = await movie.save();
  } catch (error) {
    return console.log(error);
  }
  if (!movie) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(201).json({ movie });
};
// {===========================================================GET_MOVIE===============================}
const getMovies=async(req,res,next)=>{
   let movies;
   try {
    movies=await Movie.find()
   } catch (error) {
    return console.log(error)
   }
   if(!movies){
    return res.status(500).json({message:"Movie Creation Failed"});
   }
   return res.status(200).json({movies})
}
// {===========================================================GET_MOVIE_BY_ID===============================}
const getMoviebyID=async(req,res,next)=>{
 const id=req.params.id;
 let movie;
 try {
    movie=await Movie.findById(id);
 } catch (error) {
     return console.log(error)
 }
 if(!movie){
    return res.status(404).json({message:"Invalid Movie Id"})

 }
 return res.status(200).json({movie});
}
module.exports = { addMovie,getMovies ,getMoviebyID};
