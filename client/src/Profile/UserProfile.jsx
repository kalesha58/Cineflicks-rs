import React, { useEffect, useState } from "react";
import { getUser, getUserBooking } from "../api_helpers/api_help";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./UserProfile.css";
const UserProfile = () => {
  const [user, setUser] = useState();
 

  useEffect(() => {
    getUser()
      .then((res) => setUser(res.user))
      .catch((err) => {
        console.log(err);
      });
  }, []);
    console.log(user);
  const [bookings, setBookings] = useState();
  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(bookings);
  return (
    <TableContainer component={Paper} className="Table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Movie</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>SeatNumber</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings &&
            bookings.map((el) => (
              <TableRow
                key={el.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {el.movie}
                </TableCell>
                <TableCell component="th" scope="row">
                  {new Date(el.date).toDateString()}
                </TableCell>
                <TableCell component="th" scope="row">
                  {el.seatNumber}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserProfile;
