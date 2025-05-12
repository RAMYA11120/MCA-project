import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import { Box, Typography, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventIcon from "@mui/icons-material/Event";
import axios from "axios";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  const [userCount, setUserCount] = useState(0);
  const [hospitalCount, setHospitalCount] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [campCount, setCampCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/admin/dashboard"); // Your API endpoint
        // Assuming the response is structured as per your data example

        // For user count (assuming each user has a unique _id)
        const userCount = response.data.userdata.length;

        // For hospital count (assuming the role "hospital" is used for hospitals)
        const hospitalCount = response.data.userdata.filter(user => user.role === "hospital").length;

        // For inventory count (assuming each inventory entry is unique)
        const inventoryCount = response.data.inventory.length;

        // For campaign count (assuming each campaign is unique)
        const campCount = response.data.campaign.length;

        // Assign the response data to the state variables
        setUserCount(userCount);
        setHospitalCount(hospitalCount);
        setInventoryCount(inventoryCount);
        setCampCount(campCount);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <Box sx={{ p: 3, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Welcome Admin <span style={{ color: "green" }}>{user?.name}</span>
        </Typography>
        <Typography variant="h6" gutterBottom>
          Blood Bank Management Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          This platform allows you to manage blood inventory, monitor donors, collaborate with hospitals, and plan donation events to ensure timely availability of blood.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "#fff3f3", minHeight: 180 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <VolunteerActivismIcon color="error" sx={{ fontSize: 50 }} />
                  <Typography variant="h6" sx={{ ml: 2 }}>
                    Blood Donation Awareness
                  </Typography>
                </Box>
                <Typography variant="body2">
                  Promote the importance of regular blood donation and how it saves lives every day.
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {userCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "#f3f8ff", minHeight: 180 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <LocalHospitalIcon color="primary" sx={{ fontSize: 50 }} />
                  <Typography variant="h6" sx={{ ml: 2 }}>
                    Hospital & Organization Support
                  </Typography>
                </Box>
                <Typography variant="body2">
                  Collaborate with trusted hospitals and NGOs to ensure smooth blood supply chain management.
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {hospitalCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "#f9f0ff", minHeight: 180 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <BloodtypeIcon color="secondary" sx={{ fontSize: 50 }} />
                  <Typography variant="h6" sx={{ ml: 2 }}>
                    Blood Bank Operations
                  </Typography>
                </Box>
                <Typography variant="body2">
                  Track and manage blood stock, donors, and inventory efficiently with our admin dashboard.
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {inventoryCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "#f0fff4", minHeight: 180 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <EventIcon color="success" sx={{ fontSize: 50 }} />
                  <Typography variant="h6" sx={{ ml: 2 }}>
                    Upcoming Blood Donation Camps
                  </Typography>
                </Box>
                <Typography variant="body2">
                  Stay informed about upcoming donation drives and awareness events across different locations.
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {campCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default AdminHome;
