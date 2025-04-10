import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
const colors = ["#884A39", "#C38154", "#FFC26F", "#4F709C", "#4942E4", "#0079FF", "#FF0060", "#22A699"];

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
    getBloodRecords();
  }, []);

  // Dummy chart data for demonstration
  const donationsPerMonth = [
    { month: "Jan", donations: 30 },
    { month: "Feb", donations: 45 },
    { month: "Mar", donations: 22 },
    { month: "Apr", donations: 50 },
  ];

  const availableChartData = data.map((item) => ({
    name: item.bloodGroup,
    value: item.availabeBlood,
  }));

  const filteredInventory = inventoryData.filter((item) => {
    const matchesSearch =
      item.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.inventoryType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType ? item.inventoryType === filterType : true;

    return matchesSearch && matchesFilter;
  });




  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(inventoryData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BloodInventory");
    XLSX.writeFile(workbook, "blood_inventory.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    inventoryData.forEach((item, index) => {
      doc.setFillColor(240, 240, 240);
      doc.rect(10, yOffset, 190, 40, "F"); // Card background

      doc.setFontSize(10);
      doc.setTextColor(0);
      doc.text(`Blood Group: ${item.bloodGroup}`, 15, yOffset + 8);
      doc.text(`Inventory Type: ${item.inventoryType}`, 15, yOffset + 16);
      doc.text(`Quantity: ${item.quantity} ML`, 15, yOffset + 24);
      doc.text(`Email: ${item.email}`, 15, yOffset + 32);
      doc.text(`Date: ${moment(item.createdAt).format("DD/MM/YYYY hh:mm A")}`, 110, yOffset + 8);

      yOffset += 50;
      if (yOffset > 270 && index !== inventoryData.length - 1) {
        doc.addPage();
        yOffset = 10;
      }
    });

    doc.save("blood_inventory_cards.pdf");
  };


  return (
    <>
      <Header />
      <div style={{ padding: "5rem" }}>
        <Typography variant="h4" gutterBottom>
          Blood Group Statistics
        </Typography>
        <Grid container spacing={2}>
          {data?.map((record, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ backgroundColor: colors[i % colors.length], color: "#fff", height: "250px", width: "250px" }}>
                <CardContent>
                  <Typography variant="h6" align="center" bgcolor="#fff" color="#000" sx={{ borderRadius: 1, mb: 1 }}>
                    {record.bloodGroup}
                  </Typography>
                  <Typography variant="body1">Total In: <b>{record.totalIn}</b> (ML)</Typography>
                  <Typography variant="body1">Total Out: <b>{record.totalOut}</b> (ML)</Typography>
                </CardContent>
                <div style={{ backgroundColor: "#222", color: "#fff", textAlign: "center", padding: "0.5rem" }}>
                  Total Available: <b>{record.availabeBlood}</b> (ML)
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Typography variant="h5" mt={4} gutterBottom>Analytics Charts</Typography>
        <Grid container spacing={3}  >
          <Grid item xs={12} md={12}>
            <Typography variant="subtitle1" align="center">Donations per Month</Typography>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={donationsPerMonth}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="donations" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>

          <Grid item xs={12} md={12} sx={{ width: "350px", height: "300px" }}>
            <Typography variant="subtitle1" align="center">Available Blood Units</Typography>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart >
                <Pie data={availableChartData} dataKey="value" nameKey="name" outerRadius={150} label>
                  {availableChartData.map((_, index) => (
                    <Cell key={index} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>

        {/* Table */}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", margin: "1rem 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "" }}>
            <input
              type="text"
              placeholder="Search by blood group, type or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: "10px", width: "60%", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            >
              <option value="">All Types</option>
              <option value="in">In</option>
              <option value="out">Out</option>
            </select>
          </div>

          <button onClick={exportToExcel} style={{ padding: "10px", background: "#4caf50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer",height:"50px" }}>
            Export to Excel
          </button>
          <button onClick={exportToPDF} style={{ padding: "10px", background: "#1976d2", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", height:"50px"}}>
            Export to PDF (Card Format)
          </button>
        </div>


        <Typography variant="h5" mt={5} mb={2}>Recent Blood Transactions</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Blood Group</TableCell>
                <TableCell sx={{ color: "#fff" }}>Inventory Type</TableCell>
                <TableCell sx={{ color: "#fff" }}>Quantity</TableCell>
                <TableCell sx={{ color: "#fff" }}>Donor Email</TableCell>
                <TableCell sx={{ color: "#fff" }}>Time & Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInventory?.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.bloodGroup}</TableCell>
                  <TableCell>{record.inventoryType}</TableCell>
                  <TableCell>{record.quantity} (ML)</TableCell>
                  <TableCell>{record.email}</TableCell>
                  <TableCell>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Analytics;
