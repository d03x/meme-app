import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type authstore = {
  isAuthenticated: boolean;
};

const initialState: authstore = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action : PayloadAction<boolean>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isAuthenticated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
