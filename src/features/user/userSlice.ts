import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  loggedIn: boolean;
  loggedInUser: string;
};

const initialState: InitialState = {
  loggedIn: false,
  loggedInUser: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<string>) => {
      state.loggedIn = true;
      state.loggedInUser = action.payload;
    },
    userLoggedOut: (state) => {
      state.loggedIn = false;
      state.loggedInUser = "";
    },
  },
});

export default userSlice.reducer;

export const { userLoggedIn, userLoggedOut } = userSlice.actions;
