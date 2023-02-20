import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  surname: null,
  valid:false
};

const clientSlice = createSlice({
  name: "clientData",
  initialState,
  reducers: {
    setNameReducer(state, action) {
      state.name = action.payload;
    },
    setSurnameReducer(state, action) {
      state.surname = action.payload;
    },
    setValidReducer(state, action) {
      state.valid = action.payload;
    },
  },
});

export const { setNameReducer, setSurnameReducer,setValidReducer } = clientSlice.actions;
export default clientSlice.reducer;
