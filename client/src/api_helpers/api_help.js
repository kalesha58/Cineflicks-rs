import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios.get("/movie").catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};

export const sendUserAuthRequest = async (data, signup) => {
  console.log("data",data)
  const res = await axios
    .post(`/users/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
      picture:data.picture
    })
    .catch((err) => console.log(err));
  if (res.status !== 200 && res.status !== 201) {
    console.log("Unexpected Error Occurred");
  }
  const resData = await res.data;
  return resData;
};

export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`/movie/${id}`).catch((err) => {
    console.log(err);
  });
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const newBoking = async (data) => {
  const res = await axios.post("/booking", {
    movie: data.movie,
    seatNumber: data.seatNumber,
    date: data.date,
    user: localStorage.getItem("userId"),
  });
  if (res.status !== 201) {
    return console.log("Uexpected Error ");
  }
  const resData = await res.data;
  return resData;
};

export const getUserBooking=async()=>{
  const id=localStorage.getItem("userId")
  const res=await axios.get(`/users/bookings/${id}`).catch((err)=>{
    console.log(err)
  })
  if(res.status!==200){
    return console.log("UnExpected Error ")
  }
const   resData=await res.data
 return resData
}
export const getUser=async()=>{
  const id=localStorage.getItem("userId")
  const res=await axios.get(`/users/${id}`).catch((err)=>{
    console.log(err)
  })
  if(res.status!==200){
    return console.log("UnExpected Error ")
  }
const   resData=await res.data
 return resData
}