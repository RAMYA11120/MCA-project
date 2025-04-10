import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import Layout from '../../components/shared/Layout/Layout';

const CampaignForm = () => {

  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user);


  const [formData, setFormData] = useState({
    campaignName: '',
    organizerId: user?._id,
    location: '',
    date: '',
    time: '',
    expectedDonors: '',
    collectedUnits: 0,
    status: 'Upcoming',
    description: ''
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/campaigns', formData).then(res=>{
        alert('Campaign created successfully!');
      }).catch(err=>{
        alert(err.response.data.message);
        
      })
    } catch (err) {
      console.log(err.AxiosError);
      
      // console.error(err);
      alert(err.message);
    }
  };

  return (

    <Layout>
      <br /><br /><br /><br /><br />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={6}
          sx={{
            maxWidth: 700,
            margin: '2rem auto',
            padding: 4,
            borderRadius: 4,
            background: '#fff0f0'
          }}
        >
          <Typography variant="h4" gutterBottom color="error">
            Create Blood Drive Campaign
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Campaign Name"
                  name="campaignName"
                  fullWidth
                  required
                  value={formData.campaignName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Organizer ID"
                  name="organizerId"
                  fullWidth
                  required
                  value={formData.organizerId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Location"
                  name="location"
                  fullWidth
                  required
                  value={formData.location}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Date"
                  type="date"
                  name="date"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  value={formData.date}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Time"
                  name="time"
                  type="time"
                  fullWidth
                  required
                  value={formData.time}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Expected Donors"
                  name="expectedDonors"
                  type="number"
                  fullWidth
                  required
                  value={formData.expectedDonors}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Collected Units"
                  name="collectedUnits"
                  type="number"
                  fullWidth
                  value={formData.collectedUnits}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Status"
                  name="status"
                  fullWidth
                  required
                  value={formData.status}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              type="submit"
              sx={{
                mt: 3,
                backgroundColor: '#d32f2f',
                '&:hover': {
                  backgroundColor: '#9a0007'
                }
              }}
            >
              Submit Campaign
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Layout>

  );
};

export default CampaignForm;
