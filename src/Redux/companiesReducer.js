import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  allItems: [],
  total: 0,
  loading: false,
  error: null,
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setItems(state, action) {
      state.items = action.payload;
    },
    setAllItems(state, action) {
      state.allItems = action.payload;
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearCompanies(state) {
      state.items = [];
      state.total = 0;
      state.error = null;
      state.loading = false;
    },
  },
});

export const fetchCompanies = (params) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const response = await axios.get("http://localhost:3003/companies", {
      params,
    });

    const total = response.headers["x-total-count"]
      ? Number(response.headers["x-total-count"])
      : response.data.length;

    dispatch(setItems(response.data));
    dispatch(setAllItems(response.data));
    dispatch(setTotal(total));
  } catch (error) {
    dispatch(setError(error.message || "Something went wrong"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const {
  setLoading,
  setItems,
  setAllItems,
  setTotal,
  setError,
  clearCompanies,
} = companiesSlice.actions;

export default companiesSlice.reducer;
