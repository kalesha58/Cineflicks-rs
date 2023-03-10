const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Booking = require("../models/Booking");

// {=====================================GET_USERS=================================}
const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return next(error);
  }
  if (!users) {
    return res.status(500).send({ message: "Unexpected Eror Occured" });
  }
  return res.status(200).send({ users });
};
// {=====================================SIGNUP_USERS=================================}
const signUp = async (req, res, next) => {
  const { name, email, password, picture } = req.body;
  if (
    (!name &&
      name.trim() === "" &&
      !email &&
      email.trim() === "" &&
      !password &&
      password.trim() === "" && !picture && picture.trim()===""
    )
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  const hashPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = new User({ name, email, password: hashPassword, picture });
    user = await user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(201).json({ id: user._id });
};
// {=====================================UPDATE_USER=================================}
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password, picture } = req.body;
  if (
    (!name &&
      name.trim() === "" &&
      !email &&
      email.trim() === "" &&
      !password &&
      password.trim() === "" &&
    !picture && picture.trim() === "")
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  const hashPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashPassword,
      picture,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went Worng" });
  }
  res.status(200).json({ message: "Updated Sucessfully" });
};
// {=====================================DELETE_USER=================================}
const deleteUser = async (req, res, nest) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went Worng" });
  }
  res.status(200).json({ message: "Delete Sucessfully" });
};
// {=====================================LOGIN_USER=================================}
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (
    (!email && email.trim() === "" && !password && password.trim() === ""
    )
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Unable to find user from this ID " });
  }
  const isPassword = bcrypt.compareSync(password, existingUser.password);
  if (!isPassword) {
    res.status(400).json({ message: "InCorrect Password!" });
  }
  return res
    .status(200)
    .json({ message: "Login Successfull!...", id: existingUser._id });
};
// {=====================================GETBOOKING_USER=================================}
const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;
  let bookings;
  let users;

  try {
    bookings = await Booking.find({ user: id });
  } catch (error) {
    return console.log(error);
  }
  if (!bookings) {
    return res.status(500).json({ message: "Unable to get Booking" });
  }
  return res.status(200).json({ bookings });
};
const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(404).json({ message: "Invalid user Id" });
  }
  return res.status(200).json({ user });
};
module.exports = {
  getAllUsers,
  signUp,
  updateUser,
  deleteUser,
  loginUser,
  getBookingsOfUser,
  getUserById,
};
