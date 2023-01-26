// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Autocomplete,
//   TextField,
//   Tabs,
//   Tab,
// } from "@mui/material";
// import MovieIcon from "@mui/icons-material/Movie";
// import { Box } from "@mui/system";
// import { useEffect } from "react";
// import { getAllMovies } from "../../api_helpers/api_help";
// import { Link } from "react-router-dom";
// const top100Films = ["memory", "dearComrade"];

// const Header = () => {
//   const [value, setValue] = useState(0);
//   const [movies, setMovies] = useState([]);
//   useEffect(() => {
//     getAllMovies()
//       .then((data) => setMovies(data.movies))
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);
//   return (
//     <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
//       <Toolbar>
//         <Box width={"20%"}>
//           <MovieIcon  />

//         </Box>
//         <Box width={"30%"} margin={"auto"}>
//           <Autocomplete
//             freeSolo
//             options={movies && movies.map((option) => option.title)}
//             renderInput={(params) => (
//               <TextField
//                 sx={{ input: { color: "white" } }}
//                 variant="standard"
//                 {...params}
//                 placeholder="Search Movies...."
//               />
//             )}
//           />
//         </Box>
//         <Box display={"flex"}>
//           <Tabs
//             indicatorColor="secondary"
//             textColor="inherit"
//             value={value}
//             onChange={(e, val) => setValue(val)}
//           >
//             <Tab   LinkComponent={Link} to="/admin " label="Admin" />
//             <Tab  LinkComponent={Link} to="/auth" label="Auth" />
//             <Tab  LinkComponent={Link} to="/movies" label=" Movies" />
//           </Tabs>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../../store";

const Header = () => {
  const dispatch = useDispatch();
  const IsAdminLogegedIn = useSelector((state) => state.admin.IsLogegedIn);
  const IsUserLogegedIn = useSelector((state) => state.user.IsLogegedIn);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };
  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
          />
        </Link>
        <Link to="/movies" style={{ textDecoration: "none" }}>
          <span>MOVIES</span>
        </Link>
        {!IsAdminLogegedIn && !IsUserLogegedIn && (
          <>
            <Link to="/admin " style={{ textDecoration: "none" }}>
              <span>ADMIN</span>
            </Link>
            <Link to="/auth" style={{ textDecoration: "none" }}>
              <span>AUTH</span>
            </Link>
          </>
        )}

        {IsUserLogegedIn && (
          <>
            <Link to="/user " style={{ textDecoration: "none" }}>
              <span>PROFILE</span>
            </Link>
            <Link
              to="/"
              onClick={() => logout()}
              style={{ textDecoration: "none" }}
            >
              <span>LOGOUT</span>
            </Link>
          </>
        )}
        {IsAdminLogegedIn && (
          <>
            <Link to="/add " style={{ textDecoration: "none" }}>
              <span>ADD MOVIE</span>
            </Link>
            <Link to="/admin" style={{ textDecoration: "none" }}>
              <span>PROFILE</span>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span>LOGOUT</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
