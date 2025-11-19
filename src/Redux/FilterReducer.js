import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  q: "",
  industry: "",
  location: "",
  companySize: "",
  sortBy: "",
  sortOrder: "asc",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.q = action.payload;
    },
    setIndustry(state, action) {
      state.industry = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setCompanySize(state, action) {
      state.companySize = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
    resetFilters(state) {
      state.q = "";
      state.industry = "";
      state.location = "";
      state.companySize = "";
      state.sortBy = "name";
      state.sortOrder = "asc";
    },
  },
});

export const {
  setSearch,
  setIndustry,
  setLocation,
  setCompanySize,
  setSortBy,
  setSortOrder,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
