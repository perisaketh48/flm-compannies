import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setSearch } from "../Redux/FilterReducer";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearch(text));
    }, 400);

    return () => clearTimeout(timer);
  }, [text, dispatch]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: "360px", md: "420px" },
      }}
    >
      <TextField
        fullWidth
        placeholder="Search companies..."
        size="small"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{
          bgcolor: "background.paper",
          "& .MuiOutlinedInput-root": {
            borderRadius: { xs: 2, sm: 3 },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
