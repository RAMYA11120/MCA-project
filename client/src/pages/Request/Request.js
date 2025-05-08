import React, { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import axios from "axios";
import Layout from "../../components/shared/Layout/Layout";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const RequestForm = () => {

  const user=JSON.parse(localStorage.getItem("user"))
  console.log(user);
  

  const [form, setForm] = useState({
    requesterName:  user?.role==="organisation"? user?.organisationName:user?.hospitalName,
    requesterType: user?.role,
    contactNumber: user?.phone,
    email:user?.email,
    bloodGroup: "",
    units: "",
    reason: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/api/requests", form);
      alert("Request submitted successfully");
    } catch (err) {
      alert("Error submitting request");
    } 
  };

  return (
    <Layout>
 

      <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2", mb: 3 }}>
          Request Form
        </Typography>
        <TextField fullWidth label="Requester Name" name="requesterName"  defaultValue={form.requesterName} onChange={handleChange} margin="normal" />
        <TextField
          select
          fullWidth
          label="Requester Type"
          name="requesterType"
          value={form.requesterType}
          defaultValue={form.requesterType}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="hospital">Hospital</MenuItem>
          <MenuItem value="organisation">organisation</MenuItem>
        </TextField>
        <TextField fullWidth label="email" name="email"  defaultValue={form.email} onChange={handleChange} margin="normal" />

        <TextField fullWidth label="Contact Number" name="contactNumber"  defaultValue={form.contactNumber} onChange={handleChange} margin="normal" />
        <TextField
          select
          fullWidth
          label="Blood Group"
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
          margin="normal"
        >
          {bloodGroups.map((group) => (
            <MenuItem key={group} value={group}>{group}</MenuItem>
          ))}
        </TextField>
        <TextField fullWidth label="Units Required" name="units" type="number" onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Reason" name="reason" onChange={handleChange} margin="normal" />
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
          Submit Request
        </Button>
      </Box>

    </Layout>
  );
};

export default RequestForm;
