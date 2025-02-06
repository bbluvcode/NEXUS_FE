import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

function AccountAndConnectionTab({ accounts }) {
    const [accountData, setAccountData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    accounts.map(account =>
                        axios.get(`http://localhost:5185/api/Account/connections-by-account/${account.accountId}`)
                    )
                );
                setAccountData(responses.map(response => response.data.data));
            } catch (error) {
                console.error("Error fetching account data", error);
            }
        };

        if (accounts && accounts.length > 0) {
            fetchData();
        }
    }, [accounts]);

    return (
        <TableContainer component={Paper} sx={{ mt: 2, background: "transparent" }}>
            {(!accountData || accountData.length === 0) ? (
                <Typography
                    variant="h6"
                    align="center"
                    sx={{ p: 4, color: "text.secondary" }}
                >
                    No accounts or connections yet.
                </Typography>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ServiceOrderID</TableCell>
                            <TableCell align="center">AccountID</TableCell>
                            <TableCell align="center">ConnectionID</TableCell>
                            <TableCell align="center">Status Connection</TableCell>
                            <TableCell align="center">Connection DateStart</TableCell>
                            <TableCell align="center">Connection DateEnd</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {accountData.map((accountInfo, index) => (
                            accountInfo.map((connection, connIndex) => (
                                <TableRow key={`${index}-${connIndex}`}>
                                    <TableCell align="center">{connection.orderId}</TableCell>
                                    <TableCell align="center">{accounts[index].accountId}</TableCell>
                                    <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>{connection.connectionId}</TableCell>
                                    <TableCell align="center">{connection.isActive ? "Active" : "Inactive"}</TableCell>
                                    <TableCell align="center">
                                        {new Date(connection.connectionDiaryDateStart).toLocaleString("en-GB", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        })}
                                    </TableCell>
                                    <TableCell align="center">
                                        {connection.connectionDiaryDateEnd
                                            ? new Date(connection.connectionDiaryDateEnd).toLocaleString("en-GB", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                            })
                                            : "N/A"}
                                    </TableCell>
                                </TableRow>
                            ))
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
}

export default AccountAndConnectionTab;
