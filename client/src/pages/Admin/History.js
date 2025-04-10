import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import Layout from "../../components/shared/Layout/Layout";

const DonationHistory = ( ) => {
    // email
//    const {user }=useSelector((state=>state.auth))
const user = JSON.parse(localStorage.getItem("user"))
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(user);
  

  const fetchDonationHistory = async () => {
    try {
      const res = await fetch(`http://localhost:8000/donation-history/${user.email}`);
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Failed to fetch history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonationHistory();
  }, []);

  return (
       
    <Layout> 
    <Card sx={{ margin: "2rem", borderRadius: 4, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Donation History for {user?.email}
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell sx={{ color: "white" }}>Date</TableCell>
                  <TableCell sx={{ color: "white" }}>Blood Group</TableCell>
                  <TableCell sx={{ color: "white" }}>Quantity (ml)</TableCell>
                  <TableCell sx={{ color: "white" }}>Donor</TableCell>
                  <TableCell sx={{ color: "white" }}>Organisation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{format(new Date(item.createdAt), "dd MMM yyyy, hh:mm a")}</TableCell>
                    <TableCell>{item.bloodGroup}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.donar?.name}</TableCell>
                    <TableCell>{item.organisation?.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
     </Layout>
  );
};

export default DonationHistory;
