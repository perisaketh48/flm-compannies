import React, { useState, useMemo } from "react";
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
  const { items, loading, error } = useSelector((state) => state.companies);
  const { q } = useSelector((state) => state.filters);

  const searchedItems = useMemo(() => {
    if (!q) return items;

    const s = q.toLowerCase();
    return items.filter((c) => JSON.stringify(c).toLowerCase().includes(s));
  }, [items, q]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    setPage(1);
  }, [searchedItems]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return searchedItems.slice(start, start + pageSize);
  }, [searchedItems, page, pageSize]);

  const totalPages = Math.ceil(searchedItems.length / pageSize);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  if (!loading && searchedItems.length === 0)
    return (
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          width: "100%",
          mt: 5,
          height: "40vh",
          color: "text.secondary",
        }}
      >
        No Results Found
      </Typography>
    );

  return (
    <>
      {/* Responsive GRID */}
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "auto",
          pb: 2,
        }}
      >
        {paginatedItems.map((company) => (
          <Grid
            item
            key={company.id}
            sx={{
              width: {
                xs: "100%",
                sm: "45%",
                md: "30%",
              },
            }}
          >
            <CompanyCard company={company} />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "flex-end",
          alignItems: { xs: "stretch", sm: "center" },
          mb: 4,
          gap: 2,
        }}
      >
        <FormControl size="small" sx={{ width: { xs: "100%", sm: "auto" } }}>
          <Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value={5}>5 / page</MenuItem>
            <MenuItem value={10}>10 / page</MenuItem>
            <MenuItem value={20}>20 / page</MenuItem>
            <MenuItem value={50}>50 / page</MenuItem>
          </Select>
        </FormControl>

        <Pagination
          count={totalPages}
          page={page}
          color="primary"
          onChange={(event, value) => setPage(value)}
          sx={{
            "& .MuiPagination-ul": {
              justifyContent: { xs: "center", sm: "flex-end" },
            },
          }}
        />
      </Box>
    </>
  );
};

export default CompaniesGridView;
