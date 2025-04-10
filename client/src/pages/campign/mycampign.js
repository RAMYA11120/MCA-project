import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Grid, Button,
  Dialog, DialogTitle, DialogContent, TextField, DialogActions,
} from '@mui/material';
import axios from 'axios';
import Layout from '../../components/shared/Layout/Layout';


const MyCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    

const userid=JSON.parse(localStorage.getItem("user"))?._id
    const fetchCampaigns = async () => {
        try {
        const API_URL = `http://localhost:8000/api/campaigns/my-campaigns/${userid}`;
      const res = await axios.get(API_URL);
      setCampaigns(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (campaign) => {
    setSelected(campaign);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/campaigns/${id}`);
      fetchCampaigns();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/campaigns/${selected._id}`, selected);
      handleClose();
      fetchCampaigns();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <Layout>
    <div style={{ padding: 80 }}>
      <Typography variant="h4" gutterBottom>My Campaigns</Typography>
      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} md={6} lg={4} key={campaign._id}>
            <Card sx={{ minHeight: 200 }}>
              <CardContent>
                <Typography variant="h6">{campaign.campaignName}</Typography>
                <Typography><strong>Date:</strong> {new Date(campaign.date).toLocaleDateString()}</Typography>
                <Typography><strong>Time:</strong> {campaign.time}</Typography>
                <Typography><strong>Location:</strong> {campaign.location}</Typography>
                <Typography><strong>Expected Donors:</strong> {campaign.expectedDonors}</Typography>
                <Typography><strong>Collected Units:</strong> {campaign.collectedUnits}</Typography>
                <Typography><strong>Status:</strong> {campaign.status}</Typography>
                <Typography variant="body2" mt={1}>{campaign.description}</Typography>

                <div style={{ marginTop: 10 }}>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(campaign)} sx={{ mr: 1 }}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(campaign._id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Campaign</DialogTitle>
        <DialogContent>
          {selected && (
            <>
              <TextField
                label="Campaign Name"
                fullWidth
                margin="dense"
                value={selected.campaignName}
                onChange={(e) => setSelected({ ...selected, campaignName: e.target.value })}
              />
              <TextField
                label="Location"
                fullWidth
                margin="dense"
                value={selected.location}
                onChange={(e) => setSelected({ ...selected, location: e.target.value })}
              />
              <TextField
                label="Date"
                type="date"
                fullWidth
                margin="dense"
                value={selected.date?.slice(0, 10)}
                onChange={(e) => setSelected({ ...selected, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Time"
                type="time"
                fullWidth
                margin="dense"
                value={selected.time}
                onChange={(e) => setSelected({ ...selected, time: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Expected Donors"
                type="number"
                fullWidth
                margin="dense"
                value={selected.expectedDonors}
                onChange={(e) => setSelected({ ...selected, expectedDonors: e.target.value })}
              />
              <TextField
                label="Collected Units"
                type="number"
                fullWidth
                margin="dense"
                value={selected.collectedUnits}
                onChange={(e) => setSelected({ ...selected, collectedUnits: e.target.value })}
              />
              <TextField
                label="Status"
                fullWidth
                margin="dense"
                value={selected.status}
                onChange={(e) => setSelected({ ...selected, status: e.target.value })}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                margin="dense"
                value={selected.description}
                onChange={(e) => setSelected({ ...selected, description: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
    </Layout>
  );
};

export default MyCampaigns;
