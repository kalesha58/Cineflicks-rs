import { configureStore, createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    IsLogegedIn: false,
  },
  reducers: {
    login(state) {
      state.IsLogegedIn = true;
    },
    logout(state) {
        localStorage.removeItem("userId")
        state.IsLogegedIn = false;
    },
},
});

const adminSlice = createSlice({
    name: "auth",
    initialState: {
        IsLogegedIn: false,
    },
    reducers: {
        login(state) {
            state.IsLogegedIn = true;
        },
        logout(state) {
            localStorage.removeItem("adminId")
            localStorage.removeItem("token")
            state.IsLogegedIn = false;
    },
  },
});
export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer,
  },
});
