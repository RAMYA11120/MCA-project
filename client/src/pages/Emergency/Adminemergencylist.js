import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Select, MenuItem, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, InputAdornment
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { jsPDF } from "jspdf";
import * as XLSX from 'xlsx';
import axios from "axios";
import Layout from "../../components/shared/Layout/Layout";

const statusOptions = ["Pending", "Notified", "Completed"];

const EmergencyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:8000/api/emergency/all");
    setRequests(res.data);
    setFilteredRequests(res.data);
  };

  const handleSearch = () => {
    const result = requests.filter((r) =>
      r.patientName.toLowerCase().includes(search.toLowerCase()) ||
      r.hospitalName.toLowerCase().includes(search.toLowerCase())
    ).filter(r => bloodGroupFilter ? r.bloodGroup === bloodGroupFilter : true);
    setFilteredRequests(result);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search, bloodGroupFilter]);

  const handleStatusChange = async (id, newStatus) => {
    await axios.patch(`http://localhost:8000/api/emergency/status/${id}`, { status: newStatus });
    fetchRequests();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/emergency/${id}`);
    fetchRequests();
  };

  const handleEditSave = async () => {
    await axios.put(`http://localhost:8000/api/emergency/update/${editData._id}`, editData);
    setEditData(null);
    fetchRequests();
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRequests);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Emergency Requests");
    XLSX.writeFile(workbook, "emergency_requests.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    filteredRequests.forEach((req, i) => {
      doc.rect(10, y, 190, 45);
      doc.text(`Patient: ${req.patientName}`, 15, y + 10);
      doc.text(`Hospital: ${req.hospitalName}`, 15, y + 20);
      doc.text(`Location: ${req.location}`, 15, y + 30);
      doc.text(`Blood Group: ${req.bloodGroup} | Units: ${req.unitsNeeded}`, 15, y + 40);
      doc.text(`Contact: ${req.contactNumber}`, 140, y + 40);
      y += 50;
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });
    doc.save("emergency_requests.pdf");
  };

  return (
    <>
    <Layout>

   
    <div  style={{ display: "flex",flexDirection:"column", gap: 10, marginTop: 20,alignItems:"center",
        justifyContent:"center"
     }}>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <TextField
          placeholder="Search by patient or hospital"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        />
        <Select
          value={bloodGroupFilter}
          displayEmpty
          onChange={(e) => setBloodGroupFilter(e.target.value)}
        >
          <MenuItem value="">All Blood Groups</MenuItem>
          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
            <MenuItem value={group} key={group}>{group}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" onClick={exportExcel}>Export Excel</Button>
        <Button variant="contained" color="secondary" onClick={exportPDF}>Export PDF</Button>
      </div>

      <TableContainer component={Paper} sx={{ mt: 4 ,width:'88%'}}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f50057" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Patient</TableCell>
              <TableCell sx={{ color: "#fff" }}>Hospital</TableCell>
              <TableCell sx={{ color: "#fff" }}>Location</TableCell>
              <TableCell sx={{ color: "#fff" }}>Blood Group</TableCell>
              <TableCell sx={{ color: "#fff" }}>Units</TableCell>
              <TableCell sx={{ color: "#fff" }}>Contact</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.patientName}</TableCell>
                <TableCell>{row.hospitalName}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.bloodGroup}</TableCell>
                <TableCell>{row.unitsNeeded}</TableCell>
                <TableCell>
                  <a href={`tel:${row.contactNumber}`}><PhoneIcon color="primary" /></a>
                  <a href={`https://wa.me/${row.contactNumber}`} target="_blank" rel="noopener noreferrer"><WhatsAppIcon color="success" sx={{ ml: 1 }} /></a>
                </TableCell>
                <TableCell>
                  <Select
                    value={row.status}
                    onChange={(e) => handleStatusChange(row._id, e.target.value)}
                    size="small"
                  >
                    {statusOptions.map((s) => (
                      <MenuItem value={s} key={s}>{s}</MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => setEditData(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(row._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Edit Modal */}
        {editData && (
          <Dialog open={true} onClose={() => setEditData(null)}>
            <DialogTitle>Edit Emergency Request</DialogTitle>
            <DialogContent>
              <TextField fullWidth margin="dense" label="Patient Name" value={editData.patientName}
                onChange={(e) => setEditData({ ...editData, patientName: e.target.value })} />
              <TextField fullWidth margin="dense" label="Hospital Name" value={editData.hospitalName}
                onChange={(e) => setEditData({ ...editData, hospitalName: e.target.value })} />
              <TextField fullWidth margin="dense" label="Location" value={editData.location}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })} />
              <TextField fullWidth margin="dense" label="Blood Group" value={editData.bloodGroup}
                onChange={(e) => setEditData({ ...editData, bloodGroup: e.target.value })} />
              <TextField fullWidth margin="dense" label="Units Needed" value={editData.unitsNeeded}
                onChange={(e) => setEditData({ ...editData, unitsNeeded: e.target.value })} />
              <TextField fullWidth margin="dense" label="Contact Number" value={editData.contactNumber}
                onChange={(e) => setEditData({ ...editData, contactNumber: e.target.value })} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditData(null)}>Cancel</Button>
              <Button variant="contained" onClick={handleEditSave}>Save</Button>
            </DialogActions>
          </Dialog>
        )}
      </TableContainer>
    </div>
     </Layout>
    </>
  );
};

export default EmergencyRequests;