import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const fetchCompanies = (params) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api`, {
      params,
    });

    dispatch(setItems(response.data));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const { setLoading, setItems, setError } = companiesSlice.actions;
export default companiesSlice.reducer;
