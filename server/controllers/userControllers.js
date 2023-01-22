const User = require("../models/User");

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
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let user;
  try {
    user = await new User({ name, email, password });
    user = user.save();
  } catch (error) {
    return next(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(201).json({ user });
};
module.exports = { getAllUsers, signUp };
