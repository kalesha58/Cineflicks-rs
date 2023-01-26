import {
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import "./Common.css";
import { Box } from "@mui/system";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useState } from "react";
const labelStyle = { marginTop: 1, marginBottom: 1 };
const AuthForm = ({ onSubmit, isAdmin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };
  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {isSignup ? "Signup" : "Login"}
      </Typography>
      <form className="box" onSubmit={handleSubmit}>
        <Box
          dispaly={"felx"}
          justifyContent={"center"}
          flexDirection="column"
          width={400}
          margin={"auto"}
          alignContent={"center"}
          padding={4}
        >
          {!isAdmin && isSignup && (
            <>
              <FormLabel sx={labelStyle}>Name</FormLabel>
              <br />
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                sx={{ width: "100%" }}
                type="text"
                name="name"
              />
              <br />
            </>
          )}
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <br />
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            sx={{ width: "100%" }}
            type="email"
            name="email"
          />
          <br />
          <FormLabel sx={labelStyle}>Password</FormLabel>
          <br />
          <TextField
            value={inputs.password}
            onChange={handleChange}
            margin="normal"
            sx={{ width: "100%" }}
            type="password"
            name="password"
          />
          <br />
          <Button
            sx={{ marginTop: 2, borderRadius: 10, bgcolor: "black" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
          {!isAdmin && (
            <Button
              sx={{ marginTop: 2, borderRadius: 10 }}
              fullWidth
              variant="contained"
              onClick={() => setIsSignup(!isSignup)}
            >
              Switch To {isSignup ? "Login" : "Signup"}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
