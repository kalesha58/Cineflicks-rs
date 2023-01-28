import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { getAllMovies } from "../../api_helpers/api_help";
import Card from "../card/Card";


const Movies = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  },[]);
  return (
    <div className="movie__list">
    <h2 className="list__title">All Movies </h2>
    <div className="list__cards">
        {
           movies &&  movies.map(el => (
                <Card key={el._id} title={el.title }  vote_average={el.vote_average} posterUrl={el.posterUrl} releaseDate={el.releaseDate} id={el._id} description={el.description } />
            ))
        }
    </div>
</div>
  );
};

export default Movies;
