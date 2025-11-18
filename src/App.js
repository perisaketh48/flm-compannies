// src/App.js
import React, { useEffect } from "react";
import { Container, Box } from "@mui/material";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import CompaniesGridView from "./components/CompaniesGridView";
import { fetchCompanies } from "./Redux/companiesReducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    const params = {
      q: filters.q || undefined,
      industry: filters.industry || undefined,
      location: filters.location || undefined,
      companySize: filters.companySize || undefined,
      _sort: filters.sortBy || undefined,
      _order: filters.sortOrder || undefined,
    };

    console.log("Fetching companies with params:", params); // debug line
    dispatch(fetchCompanies(params));
  }, [
    dispatch,
    filters.q,
    filters.industry,
    filters.location,
    filters.companySize,
    filters.sortBy,
    filters.sortOrder,
  ]);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <FilterBar />
        <CompaniesGridView />
      </Container>
    </Box>
  );
};

export default App;
