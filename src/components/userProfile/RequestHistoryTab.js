import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';

function RequestHistoryTab({ requests }) {
    const handleDetailClick = (request) => {
        console.log("request detail", request);
    };
    return (
        <TableContainer component={Paper} sx={{ mt: 2, background: "transparent", }}>
            {(!requests || requests.length === 0) ? (
                <Typography 
                    variant="h6" 
                    align="center" 
                    sx={{ p: 4, color: "text.secondary" }}
                >
                    No requests history yet.
                </Typography>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Service</TableCell>
                            <TableCell align="center">Equipment</TableCell>
                            <TableCell align="center"sx={{ whiteSpace: "nowrap" }}>Request Date</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {requests.map((request, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell align="center">{request.RequestTitle}</TableCell>
                                <TableCell align="center">{request.ServiceRequest}</TableCell>
                                <TableCell align="center">{request.EquipmentRequest}</TableCell>
                                <TableCell align="center">{request.DateCreate}</TableCell>
                                <TableCell align="center">{request.IsResponse ? "Processed" : "Processing"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
}

export default RequestHistoryTab;
