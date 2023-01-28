import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBoking } from "../../api_helpers/api_help";
import "./Booking.css";

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    getMovieDetails(id)
      .then((res) => {
        setMovie(res.movie);
        // console.log(res.movie)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    newBoking({ ...inputs, movie: movie._id })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
    console.log(inputs);
  };
  console.log(movie);
  return (
    <div>
      {movie && (
        <div className="movie">
          <div className="movie__intro">
            <img className="movie__backdrop" src={movie.poster_path} />
          </div>
          <div className="movie__detail">
            <div className="movie__detailLeft">
              <div className="movie__posterBox">
                <img className="movie__poster" src={movie.posterUrl} />
              </div>
            </div>
            <div className="movie__detailRight">
              <div className="movie__detailRightTop">
                <div className="movie__name">{movie.title}</div>
                <div className="movie__tagline">
                  {movie ? movie.tagline : ""}
                </div>
                <div className="movie__rating">
                  {movie ? movie.vote_average : ""} <i class="fas fa-star" />
                </div>
                <div className="movie__runtime">
                  {movie ? movie.runtime + " mins" : ""}
                </div>
                <div className="movie__releaseDate">
                  {" "}
                  {new Date(movie.releaseDate).toDateString()}
                </div>
                <div className="movie__genres">
                  {movie && movie.actors
                    ? movie.actors.map((el) => (
                        <>
                          <span className="movie__genre" id={el.id}>
                            {el}
                          </span>
                        </>
                      ))
                    : ""}
                </div>
              </div>
              <div className="movie__detailRightBottom">
                <div className="synopsisText">Synopsis</div>
                <div>{movie ? movie.description : ""}</div>
              </div>

              <div>
                <form onSubmit={handleSubmit}>
                  <TextField
                    className="input"
                    value={inputs.date}
                    onChange={handleChange}
                    type={"date"}
                    name="date"
                  />
                  <TextField
                    className="input1"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    type={"number"}
                    name="seatNumber"
                  />

                  <Button type="submit" class="btn" variant="contained">
                    Book Now
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
