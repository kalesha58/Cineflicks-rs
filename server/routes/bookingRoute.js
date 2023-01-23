const express = require("express");
const {
  newBokking,
  getBookingMovieByID,
  deleteBooking,
} = require("../controllers/bookingController");

const bookingRouter = express.Router();

bookingRouter.post("/", newBokking);

bookingRouter.get("/:id", getBookingMovieByID);
bookingRouter.delete("/:id", deleteBooking);
module.exports = bookingRouter;
