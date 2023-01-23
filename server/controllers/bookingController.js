const Booking = require("../models/Booking");

const newBokking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;
  let booking;
  try {
    booking = new Booking({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });
    booking = await booking.save();
    if (!booking) {
      return res.status(500).json({ message: "Unable to Create a Booking" });
    }
    return res.status(201).json({ booking });
  } catch (error) {
    return console.log(error);
  }
};
module.exports = { newBokking };
