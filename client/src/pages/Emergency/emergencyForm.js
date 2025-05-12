import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Card,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box
} from '@mui/material';
import Layout from '../../components/shared/Layout/Layout';

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

function EmergencyForm() {
  const [form, setForm] = useState({
    patientName: '',
    hospitalName: '',
    location: '',
    bloodGroup: '',
    unitsNeeded: '',
    contactNumber: ''
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleLocationFetch = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const address = data.display_name || 'Unknown location';
          setForm({ ...form, location: address });
        } catch (error) {
          setMessage('Unable to retrieve address');
          setIsSuccess(false);
        }
      },
      () => {
        setMessage('Failed to fetch location');
        setIsSuccess(false);
      }
    );
  } else {
    setMessage('Geolocation not supported');
    setIsSuccess(false);
  }
};


  const validateMobile = (number) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateMobile(form.contactNumber)) {
      setMessage('Invalid mobile number. Please enter a valid 10-digit number.');
      setIsSuccess(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/emergency/submit', form);
      setMessage(res.data.message || 'Submitted successfully');
      setIsSuccess(true);
      setForm({
        patientName: '',
        hospitalName: '',
        location: '',
        bloodGroup: '',
        unitsNeeded: '',
        contactNumber: ''
      });
    } catch (err) {
      setMessage('Failed to submit emergency request');
      setIsSuccess(false);
    }
  };

  return (
      <Layout>
    <Card style={{ padding: 20, maxWidth: 500, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>Emergency Blood Request</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="patientName" label="Patient Name" fullWidth margin="normal" value={form.patientName} onChange={handleChange} />
        <TextField name="hospitalName" label="Hospital Name" fullWidth margin="normal" value={form.hospitalName} onChange={handleChange} />
        <Box display="flex" gap={1}>
          <TextField
            name="location"
            label="Location"
            fullWidth
            margin="normal"
            value={form.location}
            onChange={handleChange}
          />
          <Button variant="outlined" color="primary" onClick={handleLocationFetch} style={{ marginTop: 16 }}>
            Use Current
          </Button>
        </Box>
        <FormControl fullWidth margin="normal">
          <InputLabel>Blood Group</InputLabel>
          <Select
            name="bloodGroup"
            value={form.bloodGroup}
            label="Blood Group"
            onChange={handleChange}
          >
            {bloodGroups.map((group) => (
              <MenuItem key={group} value={group}>{group}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField name="unitsNeeded" label="Units Needed" fullWidth margin="normal" value={form.unitsNeeded} onChange={handleChange} />
        <TextField
          name="contactNumber"
          label="Contact Number"
          fullWidth
          margin="normal"
          value={form.contactNumber}
          onChange={handleChange}
          inputProps={{ maxLength: 10 }}
        />
        <Button variant="contained" color="error" type="submit" fullWidth>
          Submit Emergency
        </Button>
      </form>
      {message && (
        <Typography style={{ marginTop: 20, color: isSuccess ? 'green' : 'red' }}>
          {message}
        </Typography>
      )}
    </Card>
    </Layout>
  );
}

export default EmergencyForm;
