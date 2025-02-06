import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "username",
    token: "",
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setId, setToken } = userSlice.actions;
export default userSlice.reducer;
