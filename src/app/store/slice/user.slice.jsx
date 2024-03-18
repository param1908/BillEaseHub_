import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUserDetails: (state, action) => {
      state.userDetails = action?.payload;
    },
  },
});

export const { storeUserDetails } = userSlice.actions;
export default userSlice.reducer;
