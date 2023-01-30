const { default: mongoose } = require("mongoose");
const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const User = require("../models/User");
// {==================================================CREATE NEW BOOKING =========================}
const newBokking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;
  // =------------for RELATIONSHIPS----------------------
  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not Found With Given ID" });
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Found with Given ID" });
  }
  //   ----------------------------TILL HERE RELATIONS ONLY----------------------
  let booking;
  try {
    booking = new Booking({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });
console.log(booking)
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });
    session.commitTransaction();

    // booking = await booking.save();
    if (!booking) {
      return res.status(500).json({ message: "Unable to Create a Booking" });
    }
    return res.status(201).json({ booking });
  } catch (error) {
    return console.log(error);
  }
};
// {==================================================GET BOOKING =========================}

const getBookingMovieByID = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Booking.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking });
};
// {==================================================DELETE BOOKING =========================}
const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Booking.findByIdAndRemove(id).populate("user movie");
    const session = await mongoose.startSession();
    session.startTransaction();

    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    await booking.movie.save({ session });
    await booking.user.save({ session });
    session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }
  if(!booking){
    return res.status(500).json({message:"Unable to Delete"});
  }
  return res.status(200).json({message:"Deleted Successfully!..."})
};
module.exports = { newBokking, getBookingMovieByID, deleteBooking };
