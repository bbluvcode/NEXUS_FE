import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';

function FeedbackHistoryTab({ requests }) {
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
                    No feedback history yet.
                </Typography>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">FeedBackContent</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {requests.map((request, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell align="center">{request.title}</TableCell>
                                <TableCell align="center">{request.feedBackContent}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                                    {new Date(request.date).toLocaleString("en-GB", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })}
                                </TableCell>
                                <TableCell align="center">{request.status ? "Processed" : "Not yet"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
}

export default FeedbackHistoryTab;
