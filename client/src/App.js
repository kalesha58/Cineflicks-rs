import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Admin from "./Components/Admin/Admin";
import Auth from "./Components/Auth/Auth";
import Booking from "./Components/Bookings/Booking";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import HomePage from "./Components/HomePage";
import Movies from "./Components/Movies/Movies";

import UserProfile from "./Profile/UserProfile";
import { adminActions, userActions } from "./store";

function App() {
  const IsAdminLogegedIn = useSelector((state) => state.admin.IsLogegedIn);
  const IsUserLogegedIn = useSelector((state) => state.user.IsLogegedIn);
  const dispatch = useDispatch();
  console.log(IsAdminLogegedIn);
  console.log(IsUserLogegedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, []);
  return (
    <div className="App">
      {/* Header */}
      <Header />
      {/* HomePage */}
      <section>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/booking/:id" element={<Booking />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
