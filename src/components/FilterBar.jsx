import React from "react";
import {
  Paper,
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setIndustry,
  setLocation,
  resetFilters,
  setSortBy,
  setCompanySize,
} from "../Redux/FilterReducer";
import { fetchCompanies } from "../Redux/companiesReducer";
import SearchBar from "./SearchBar";

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Energy",
  "Food & Beverage",
  "Retail",
  "Automotive",
  "Media & Entertainment",
];

const sizes = ["Startup", "Small", "Medium", "Large", "Enterprise"];

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const selectStyle = {
    bgcolor: "background.paper",
    color: "text.primary",
    borderRadius: 2,
    height: 40,
    px: 1.5,
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",

        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: { xs: "center", sm: "flex-start" },
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: "350px", md: "100%" } }}></Box>
      <SearchBar />
      {/* INDUSTRY */}
      <FormControl size="small" sx={{ width: { xs: "100%", sm: 180 } }}>
        <Select
          displayEmpty
          value={filters.industry}
          sx={selectStyle}
          onChange={(e) => {
            dispatch(setIndustry(e.target.value));
            dispatch(fetchCompanies({ ...filters, industry: e.target.value }));
          }}
          renderValue={(selected) =>
            selected ? (
              selected
            ) : (
              <span style={{ color: "#6b7280" }}>All Industries</span>
            )
          }
        >
          <MenuItem value="">All Industries</MenuItem>
          {industries.map((i) => (
            <MenuItem key={i} value={i}>
              {i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* LOCATION */}
      <FormControl size="small" sx={{ width: { xs: "100%", sm: 180 } }}>
        <Select
          displayEmpty
          value={filters.location}
          sx={selectStyle}
          onChange={(e) => {
            dispatch(setLocation(e.target.value));
            dispatch(fetchCompanies({ ...filters, location: e.target.value }));
          }}
          renderValue={(selected) =>
            selected ? (
              selected
            ) : (
              <span style={{ color: "#6b7280" }}>All Locations</span>
            )
          }
        >
          <MenuItem value="">All Locations</MenuItem>
          <MenuItem value="Atlanta, GA">Atlanta, GA</MenuItem>
          <MenuItem value="Austin, TX">Austin, TX</MenuItem>
          <MenuItem value="Boston, MA">Boston, MA</MenuItem>
          <MenuItem value="Chicago, IL">Chicago, IL</MenuItem>
          <MenuItem value="Detroit, MI">Detroit, MI</MenuItem>
          <MenuItem value="San Francisco, CA">San Francisco, CA</MenuItem>
          <MenuItem value="Seattle, WA">Seattle, WA</MenuItem>
        </Select>
      </FormControl>

      {/* SIZE */}
      <FormControl size="small" sx={{ width: { xs: "100%", sm: 180 } }}>
        <Select
          displayEmpty
          value={filters.companySize}
          sx={selectStyle}
          onChange={(e) => {
            dispatch(setCompanySize(e.target.value));
            dispatch(
              fetchCompanies({ ...filters, companySize: e.target.value })
            );
          }}
          renderValue={(selected) =>
            selected ? (
              selected
            ) : (
              <span style={{ color: "#6b7280" }}>All Sizes</span>
            )
          }
        >
          <MenuItem value="">All Sizes</MenuItem>
          {sizes.map((i) => (
            <MenuItem key={i} value={i}>
              {i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* SORT BY */}
      <FormControl size="small" sx={{ width: { xs: "100%", sm: 150 } }}>
        <Select
          displayEmpty
          value={filters.sortBy}
          sx={selectStyle}
          onChange={(e) => {
            dispatch(setSortBy(e.target.value));
            dispatch(fetchCompanies({ ...filters, _sort: e.target.value }));
          }}
          renderValue={(selected) =>
            selected ? (
              selected
            ) : (
              <span style={{ color: "#6b7280" }}>Sort By</span>
            )
          }
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="employees">Employees</MenuItem>
          <MenuItem value="foundedYear">Founded Year</MenuItem>
        </Select>
      </FormControl>

      {/* RESET BUTTON */}
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          dispatch(resetFilters());
          dispatch(
            fetchCompanies({
              q: "",
              industry: "",
              location: "",
              companySize: "",
              _sort: "name",
            })
          );
        }}
        sx={{
          width: { xs: "100%", sm: "auto" },
          height: 40,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Clear Filters
      </Button>
    </Paper>
  );
};

export default FilterBar;
