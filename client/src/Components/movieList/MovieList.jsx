import React, {useEffect, useState} from "react"
import "./MovieList.css"
import { useParams } from "react-router-dom"
import { getAllMovies } from "../../api_helpers/api_help";
import Card from "../card/Card"

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
      getAllMovies()
        .then((data) => setMovies(data.movies))
        .catch((err) => console.log(err))
    }, [movies]);
    // console.log(movies)
    
    const [movieList, setMovieList] = useState([])
    const {type} = useParams()

    // useEffect(() => {
    //     getData()
    // }, [])

    // useEffect(() => {
    //     getData()
    // }, [type])

    // const getData = () => {
        // fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        // fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        // .then(res => res.json())
        // .then(data => setMovieList(data.results))
    // }

    return (
        <div className="movie__list">
            <h2 className="list__title">POPULAR</h2>
            <div className="list__cards">
                {
                    movies.map(el => (
                        <Card key={el.id} title={el.title } posterUrl={el.posterUrl} releaseDate={el.releaseDate} id={el.id} description={el.description } />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList
