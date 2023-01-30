import {
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import "./Common.css";
import Form from "react-bootstrap/Form";
import { Box } from "@mui/system";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useState } from "react";
const labelStyle = { marginTop: 1, marginBottom: 1 };
const AuthForm = ({ onSubmit, isAdmin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [picMessage, setPicMessage] = useState(null);
  const [picture, setPicture] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    picture:""
  });
  const postDetails = (pics) => {
    if (!picture) {
      return setPicMessage("Please Select an image!.. ");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "shkoq3qc");
      data.append("cloud_name", "du3acgzcg");

      fetch("https://api.cloudinary.com/v1_1/du3acgzcg/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        
          setInputs((prev) => ({ ...prev, ...(prev.picture)=data.url.toString()}));
        })
        .catch((err) => {
          console.log(err);
        });
        
    } else {
      return setPicMessage("Please Select an Image");
    }
  };
  // console.log(picture)
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
          {!isAdmin && isSignup && (

        
          <div>
            <input
              type="file"
              name="picture"
              style={{ width: "35%", size: "xl", marginTop: "10px" }}
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
            />
          </div>
            )}
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
