import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LanguageIcon from "@mui/icons-material/Language";

const CompanyCard = ({ company }) => {
  const [expanded, setExpanded] = useState(false);

  const desc = company.description || "No description available";
  const isLong = desc.length > 120;
  const displayText = expanded
    ? desc
    : desc.slice(0, 120) + (isLong ? "..." : "");

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        p: 1,
        width: "100%",
        bgcolor: "background.paper",
        transition: "0.25s",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
        height: "100%",
      }}
    >
      <CardContent>
        {/* Heading + Industry */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1, sm: 0 },
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, fontSize: { xs: "1rem", sm: "1.1rem" } }}
            >
              {company.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {company.location}
              </Typography>
            </Box>
          </Box>

          <Chip
            label={company.industry}
            color="primary"
            size="small"
            sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
          />
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, lineHeight: 1.5 }}
        >
          {displayText}
        </Typography>

        {isLong && (
          <Button
            size="small"
            sx={{ textTransform: "none", mt: 0.5, p: 0 }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Show More"}
          </Button>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Employees + Founded */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          {company.employees != null && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PeopleIcon sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography variant="body2">
                <strong>{company.employees}</strong> employees
              </Typography>
            </Box>
          )}

          {company.foundedYear && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CalendarTodayIcon sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography variant="body2">
                Founded <strong>{company.foundedYear}</strong>
              </Typography>
            </Box>
          )}
        </Box>

        <Chip label={company.companySize} size="small" sx={{ mt: 2 }} />

        {company.website && (
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <LanguageIcon sx={{ fontSize: 18, mr: 0.5 }} />
            <Typography
              variant="body2"
              color="primary.main"
              sx={{ cursor: "pointer" }}
              onClick={() => window.open(company.website, "_blank")}
            >
              Visit Website
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
