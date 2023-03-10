const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  actors: [{ type: String, required: true }],
  releaseDate: {
    type: Date,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  vote_average: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  runtime: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "booking" }],
  admin: { type: mongoose.Types.ObjectId, ref: "admin", required: true },
});
module.exports = mongoose.model("movie", movieSchema);
