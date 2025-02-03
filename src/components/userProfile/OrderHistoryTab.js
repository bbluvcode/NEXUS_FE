import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';

function OrderHistoryTab({ orders }) {
    const handleDetailClick = (order) => {
        console.log("Order detail", order);
    };
    return (
        <TableContainer component={Paper} sx={{ mt: 2, background: "transparent", }}>
            {(!orders || orders.length === 0) ? (
                <Typography 
                    variant="h6" 
                    align="center" 
                    sx={{ p: 4, color: "text.secondary" }}
                >
                    No orders history yet.
                </Typography>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order</TableCell>
                            <TableCell align="center">Order Date</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Detail</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orders.map((order, index) => (
                            <TableRow key={index}>
                                <TableCell>{order.orderId}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>{order.orderDate}</TableCell>
                                <TableCell align="center">{order.total}</TableCell>
                                <TableCell align="center">{order.status}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleDetailClick(order)}
                                    >
                                        <AssignmentIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
}

export default OrderHistoryTab;
