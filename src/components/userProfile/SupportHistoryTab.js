import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';

function SupportHistoryTab({ requests }) {
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
                            <TableCell align="center">DetailContent</TableCell>
                            <TableCell align="center">Date Request</TableCell>
                            <TableCell align="center">Date Resolved</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {requests.map((request, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell align="center">{request.title}</TableCell>
                                <TableCell align="center">{request.detailContent}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                                    {new Date(request.dateRequest).toLocaleString("en-GB", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })}
                                </TableCell>
                                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                                    {new Date(request.dateResolved).toLocaleString("en-GB", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    }) || "N/A"}
                                </TableCell>
                                <TableCell align="center">{request.isResponse ? "Processed" : "Processing"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
}

export default SupportHistoryTab;
