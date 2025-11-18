import React, { useState, useMemo, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Pagination,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";
import CompanyCard from "./CompanyCard";

const CompaniesGridView = () => {
  const { items, allItems, loading, error } = useSelector(
    (state) => state.companies
  );
  const { q } = useSelector((state) => state.filters);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    setPage(1);
  }, [q]);

  const searchedItems = useMemo(() => {
    if (!q.trim()) return items;

    const search = q.toLowerCase();

    return allItems.filter((c) => {
      return (
        c.name.toLowerCase().includes(search) ||
        c.location.toLowerCase().includes(search)
      );
    });
  }, [q, allItems, items]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return searchedItems.slice(start, start + pageSize);
  }, [searchedItems, page, pageSize]);

  const totalPages = Math.ceil(searchedItems.length / pageSize);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  if (!loading && searchedItems.length === 0) {
    return (
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          width: "100%",
          mt: 5,
          color: "text.secondary",
        }}
      >
        No Results Found
      </Typography>
    );
  }

  return (
    <>
      {/* Pagination UI */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 4,
          gap: 2,
        }}
      >
        <FormControl size="small">
          <Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value={10}>10 / page</MenuItem>
            <MenuItem value={20}>20 / page</MenuItem>
            <MenuItem value={50}>50 / page</MenuItem>
          </Select>
        </FormControl>

        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* Grid */}
      <Grid
        container
        spacing={3}
        sx={{
          width: "90%",
          margin: "auto",
          pb: 2,
        }}
      >
        {paginatedItems.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <CompanyCard company={company} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CompaniesGridView;
