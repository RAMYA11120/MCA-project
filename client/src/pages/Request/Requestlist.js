import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Paper,
  Typography,
  Box,
  Button
} from "@mui/material";
import axios from "axios";
import Layout from "../../components/shared/Layout/Layout";
import { BiMailSend, BiMessageSquare, BiPhone } from "react-icons/bi";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import './IconAnimations.css'

// Blood Group Based Colors
const bloodGroupColors = {
  "A+": "#e57373",
  "A-": "#ef9a9a",
  "B+": "#64b5f6",
  "B-": "#90caf9",
  "AB+": "#81c784",
  "AB-": "#a5d6a7",
  "O+": "#ffd54f",
  "O-": "#ffb74d",
};

// Status Based Colors
const statusColors = {
  Pending: "#ffa726",
  Approved: "#66bb6a",
  Rejected: "#ef5350",
};

const RequestAdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    let y = 10;
  
    requests.forEach((r, index) => {
      doc.setFillColor(240, 240, 240);
      doc.rect(10, y, 190, 50, 'F');
  
      doc.setFontSize(12);
      doc.setTextColor(33, 33, 33);
      doc.text(`Name: ${r.requesterName}`, 15, y + 10);
      doc.text(`Type: ${r.requesterType}`, 15, y + 18);
      doc.text(`Blood Group: ${r.bloodGroup}`, 15, y + 26);
      doc.text(`Units: ${r.units}`, 15, y + 34);
      doc.text(`Status: ${r.status}`, 15, y + 42);
  
      doc.text(`Phone: ${r.contactNumber}`, 110, y + 10);
      doc.text(`Email: ${r.email}`, 110, y + 18);
  
      y += 60;
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });
  
    doc.save("Requests.pdf");
  };

  const exportToExcel = () => {
    const worksheetData = requests.map(r => ({
      Name: r.requesterName,
      Type: r.requesterType,
      BloodGroup: r.bloodGroup,
      Units: r.units,
      Status: r.status,
      ContactNumber: r.contactNumber,
      Email: r.email,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Requests");
  
    XLSX.writeFile(workbook, "Requests.xlsx");
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:8000/api/requests");
    setRequests(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:8000/api/requests/${id}/status`, { status });
    fetchRequests();
  };

  return (
    <Layout>
      <Box sx={{ p: 4 }}>

        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2", mb: 3 }}>
          Request Lists
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button onClick={exportToPDF}  variant="contained" color="success" style={{ marginRight: 10 }}>Export PDF</Button>
            <Button variant="contained" color="error" onClick={exportToExcel}>Export Excel</Button>
          </Box>

        <Paper elevation={4} sx={{ borderRadius: 3, overflow: "hidden" }}>
         

          <Table>
            <TableHead>
              <TableRow sx={{ background: "linear-gradient(to right, #2196f3, #21cbf3)" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Type</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Blood Group</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Units</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>contactNumber</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>email</TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((r) => (

                <TableRow
                  key={r._id}
                  sx={{
                    "&:hover": { backgroundColor: "#f5f5f5" },
                    transition: "0.3s",
                  }}
                >
                  {
                    console.log(r)

                  }
                  <TableCell>{r.requesterName}</TableCell>
                  <TableCell>{r.requesterType}</TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: bloodGroupColors[r.bloodGroup] || "#eeeeee",
                      fontWeight: "bold",
                      color: "#333",
                      borderRadius: 1,
                      px: 2,
                    }}
                  >
                    {r.bloodGroup}
                  </TableCell>
                  <TableCell>{r.units}</TableCell>
                  <TableCell>
                    <Select
                      value={r.status}
                      onChange={(e) => updateStatus(r._id, e.target.value)}
                      sx={{
                        borderRadius: 2,
                        minWidth: 130,
                        backgroundColor: statusColors[r.status] || "#eeeeee",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                    </Select>
                  </TableCell>

                  <TableCell>
                    {r.contactNumber}
                    <a href={`tel:${r.contactNumber}`} style={{ marginLeft: 8, marginRight: 8 }}>
                      <BiPhone size={18} className="beat-icon phone-icon" />
                    </a>
                    <a
                      href={`https://wa.me/${r.contactNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BiMessageSquare size={20} className="beat-icon whatsapp-icon" />
                    </a>
                  </TableCell>
                  <TableCell>
                    {r.email}
                    <a href={`mailto:${r.email}`} style={{ marginLeft: 8 }}>
                      <BiMailSend size={20} className="beat-icon email-icon" />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Layout>
  );
};

export default RequestAdminDashboard;
