import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';

function SupportHistoryTab({ supports }) {
    const handleDetailClick = (support) => {
        console.log("support detail", support);
    };
    return (
        <TableContainer component={Paper} sx={{ mt: 2, background: "transparent", }}>
            {(!supports || supports.length === 0) ? (
                <Typography 
                    variant="h6" 
                    align="center" 
                    sx={{ p: 4, color: "text.secondary" }}
                >
                    No supports history yet.
                </Typography>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Detail</TableCell>
                            <TableCell align="center"sx={{ whiteSpace: "nowrap" }}>Support Date</TableCell>
                            <TableCell align="center">Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {supports.map((support, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell align="center">{support.Title}</TableCell>
                                <TableCell align="center">{support.DetailContent}</TableCell>
                                <TableCell align="center">{support.DateRequest}</TableCell>
                                <TableCell align="center">{support.IsResolved ? "Processed" : "Pending"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
}

export default SupportHistoryTab;
