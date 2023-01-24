import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Autocomplete,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { getAllMovies } from "../api_helpers/api_help";
import { Link } from "react-router-dom";
const top100Films = ["memory", "dearComrade"];

const Header = () => {
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <AppBar sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <MovieIcon />
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search Movies...."
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            indicatorColor="secondary"
            textColor="inherit"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab   LinkComponent={Link} to="/admin " label="Admin" />
            <Tab  LinkComponent={Link} to="/auth" label="Auth" />
            <Tab  LinkComponent={Link} to="/movies" label=" Movies" />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
