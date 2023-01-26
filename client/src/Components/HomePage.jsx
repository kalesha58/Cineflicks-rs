// import { Box, Button, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getAllMovies } from "../api_helpers/api_help";
// import MovieItem from "./Movies/MovieItem";

// const HomePage = () => {
//   const [movies, setMovies] = useState([]);
//   useEffect(() => {
//     getAllMovies()
//       .then((data) => setMovies(data.movies))
//       .catch((err) => console.log(err))
//   }, []);
//   console.log(movies)
//   return (
//     <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
//       <Box margin={"auto"} width="80%" height="40vh" padding={2}>
//         <img
//           width={"100%"}
//           height="100%"
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREajIwKkI7os6gHp98XvFMd8NsqwAQVpwQWA&usqp=CAU"
//           alt=""
//         />
//       </Box>
//       <Box padding={5} margin="auto">
//         <Typography variant="h4" textAlign={"center"}>
//           Latest Release{" "}
//         </Typography>
//       </Box>
//       <Box
//         margin={"auto"}
//         display={"grid"}
//         gridTemplateColumns={"repeat(3,1fr)"}
//         width="60%"
//         justifyContent={"center"}
//         flexwrap="wrap"
//         alignItems={"Center"}

//       >
//         { movies && movies.map((el) => (
//           <MovieItem key={el} title={el.title } posterUrl={el.posterUrl} releaseDate={el.releaseDate} id={el.id} />
//         ))}
//       </Box>
//       <Box display={"flex"} padding={5} margin="auto">
//         <Button
//           LinkComponent={Link}
//           to="/movies"
//           variant="outlined"
//           sx={{ margin: "auto", color: "#2b2d42" }}
//         >
//           Load All Movies{" "}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;
