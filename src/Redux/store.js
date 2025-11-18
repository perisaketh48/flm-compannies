import { configureStore } from "@reduxjs/toolkit";
import companiesReducer from "./companiesReducer";
import filtersReducer from "./FilterReducer";

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    filters: filtersReducer,
  },
});
