import React, { useEffect } from "react";
import "./Card.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";
const Card = ({title,releaseDate,posterUrl,id,description}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        // <Link
        //   to={`/movie/${movie.id}`}
        //   style={{ textDecoration: "none", color: "white" }}
        // >
          <div className="cards" key={id}>
             <img   className="cards__img" src={posterUrl} alt={title} />
      
            <div className="cards__overlay">
              <div className="card__title">
              {title}
              </div>
              <div className="card__runtime">
              {new Date(releaseDate).toDateString()}
                <span className="card__rating">
                 
                  <i className="fas fa-star" />
                </span>
              </div>
              <div className="card__description">
              {description}
                {/* {movie ? movie.overview.slice(0, 118) + "..." : ""} */}
              </div>
              <div>
                <Button bg={"#fff"} >Book</Button>
              </div>
            </div>
          </div>
        // </Link>
      )}
    </>
  );
};

export default Card;
