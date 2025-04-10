import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  TextField,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import {
  LocationOn,
  CalendarMonth,
  AccessTime,
  Group,
  EventAvailable,
  Search,
} from "@mui/icons-material";
import axios from "axios";
import Layout from "../../components/shared/Layout/Layout";

const CampaignCard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/campaigns")
      .then((res) => {
        setCampaigns(res.data);
        setFilteredCampaigns(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch campaigns:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = campaigns;

    if (search) {
      filtered = filtered.filter(c =>
        c.campaignName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (fromDate) {
      filtered = filtered.filter(c => new Date(c.date) >= new Date(fromDate));
    }

    if (toDate) {
      filtered = filtered.filter(c => new Date(c.date) <= new Date(toDate));
    }

    setFilteredCampaigns(filtered);
  }, [search, fromDate, toDate, campaigns]);

  if (loading) return <Box textAlign="center"><CircularProgress /></Box>;

  return (
    <Layout>
      <Box p={5} sx={{ display: "flex", alignItems: "ceneter", justifyContent: "center", flexDirection: "column" }}>
        {/* Filters */}
        <Grid container spacing={1} mb={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search Campaign"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              type="date"
              label="From Date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              type="date"
              label="To Date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </Grid>
        </Grid>

        {/* Cards */}
        <Grid container spacing={2}>
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <Grid item xs={12} sm={6} md={4} key={campaign._id}>
                <Card
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                    boxShadow: 6,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: 10,
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {campaign.campaignName}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <LocationOn color="action" />
                      <Typography
                        variant="body2"
                        component="a"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campaign.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ textDecoration: 'none', color: 'primary.main', cursor: 'pointer' }}
                      >
                        {campaign.location}
                      </Typography>

                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <CalendarMonth color="action" />
                      <Typography variant="body2">
                        {new Date(campaign.date).toLocaleDateString()}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <AccessTime color="action" />
                      <Typography variant="body2">{campaign.time}</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <Group color="action" />
                      <Typography variant="body2">
                        {campaign.expectedDonors} Expected Donors
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <EventAvailable color="action" />
                      <Chip
                        label={campaign.status}
                        size="small"
                        color={campaign.status === "Upcoming" ? "success" : "error"}
                      />
                    </Stack>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={1}
                      sx={{ fontStyle: "italic" }}
                    >
                      {campaign.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography ml={2} color="text.secondary">
              No campaigns found.
            </Typography>
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default CampaignCard;
