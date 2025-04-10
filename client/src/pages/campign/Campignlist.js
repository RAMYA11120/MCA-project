import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
    Modal,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    Container,
    Chip,
    MenuItem,
} from "@mui/material";
import { Edit, Delete, PictureAsPdf, FileDownload } from "@mui/icons-material";
import { motion } from 'framer-motion';

import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import Layout from "../../components/shared/Layout/Layout";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const handleOpen = (campaign) => {
        setSelected(campaign);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const fetchData = async () => {
        const res = await axios.get("http://localhost:8000/api/campaigns/");
        setCampaigns(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/campaigns/${id}`);
        fetchData();
    };

    const handleEditSubmit = async () => {
        await axios.put(`http://localhost:8000/api/campaigns/${selected._id}`, selected);
        handleClose();
        fetchData();
    };

    const exportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(campaigns);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Campaigns");
        XLSX.writeFile(wb, "Campaigns.xlsx");
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Upcoming':
                return 'primary';
            case 'Ongoing':
                return 'warning';
            case 'Completed':
                return 'success';
            case 'Cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        let y = 10;
        campaigns.forEach((c, i) => {
            doc.setFontSize(12);
            doc.setFillColor(230, 230, 250);
            doc.rect(10, y, 190, 40, "F");
            doc.text(`Campaign: ${c.campaignName}`, 15, y + 10);
            doc.text(`Date: ${new Date(c.date).toDateString()}`, 15, y + 20);
            doc.text(`Time: ${c.time}`, 15, y + 30);
            doc.text(`Location: ${c.location}`, 100, y + 10);
            doc.text(`Donors: ${c.expectedDonors}`, 100, y + 20);
            doc.text(`Status: ${c.status}`, 100, y + 30);
            y += 50;
        });
        doc.save("Campaigns_Report.pdf");
    };

    const [searchTerm, setSearchTerm] = useState("");
    const filteredCampaigns = campaigns.filter(c =>
        c.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.status.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <Layout>
            <Container sx={{ mt: 4 }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Typography variant="h4" gutterBottom>
                        Campaign List
                    </Typography>

                    <Box mb={2} display="flex" gap={2}>
                        <Button variant="contained" onClick={exportExcel} startIcon={<FileDownload />}>
                            Excel
                        </Button>
                        <Button variant="contained" color="error" onClick={exportPDF} startIcon={<PictureAsPdf />}>
                            PDF
                        </Button>
                        <TextField
                            label="Search Campaigns"
                            variant="outlined"
                            fullWidth
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Donors</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredCampaigns?.map((c) => (
                                    <TableRow key={c._id}>
                                        <TableCell>{c.campaignName}</TableCell>
                                        <TableCell>{new Date(c.date).toDateString()}</TableCell>
                                        <TableCell>{c.time}</TableCell>
                                        <TableCell>
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                                    c.location
                                                )}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {c.location}
                                            </a>
                                        </TableCell>
                                        <TableCell>{c.expectedDonors}</TableCell>
                                        <TableCell>
                                            <motion.div
                                                key={c.status}
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Chip label={c.status} color={getStatusColor(c.status)} variant="outlined" />
                                            </motion.div>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Edit">
                                                <IconButton onClick={() => handleOpen(c)}>
                                                    <Edit color="primary" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => handleDelete(c._id)}>
                                                    <Delete color="error" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </motion.div>

                <Modal open={open} onClose={handleClose}>
                    <Box sx={style}>
                        <Typography variant="h6" mb={2}>Edit Campaign</Typography>
                        {selected && (
                            <>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    value={selected.campaignName}
                                    onChange={(e) =>
                                        setSelected({ ...selected, campaignName: e.target.value })
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Date"
                                    type="date"
                                    value={selected.date?.split("T")[0] || ""}
                                    onChange={(e) =>
                                        setSelected({ ...selected, date: e.target.value })
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Time"
                                    value={selected.time}
                                    onChange={(e) =>
                                        setSelected({ ...selected, time: e.target.value })
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Location"
                                    value={selected.location}
                                    onChange={(e) =>
                                        setSelected({ ...selected, location: e.target.value })
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Donors"
                                    type="number"
                                    value={selected.expectedDonors}
                                    onChange={(e) =>
                                        setSelected({ ...selected, expectedDonors: e.target.value })
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    select
                                    fullWidth
                                    label="Status"
                                    value={selected.status}
                                    onChange={(e) =>
                                        setSelected({ ...selected, status: e.target.value })
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    {["Upcoming", "Ongoing", "Completed", "Cancelled"].map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Button variant="contained" onClick={handleEditSubmit} fullWidth>
                                    Save Changes
                                </Button>
                            </>
                        )}
                    </Box>
                </Modal>
            </Container>
        </Layout>
    );
};

export default CampaignList;
