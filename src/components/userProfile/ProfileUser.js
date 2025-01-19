import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileCard from "./ProfileCard";
import SettingProfileCard from "./SettingProfileCard";

// FONTS
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme();

function ProfileUser() {
    const [user, setUser] = useState({
        dt1: "5 Orders",
        dt2: "150 Points",
        dt3: "01/2024",
        fullName: "Nguyen Van ABC",
        gender: "male",
        phone: "0123456789",
        email: "abc@gmail.com",
        dateOfBirth: "2000-01-01",
        orders: [
            { orderId: "D0000000001", orderDate: "2025-01-01", total: "1000$", status: "Complete" },
            { orderId: "T0000000003", orderDate: "2025-01-05", total: "2000$", status: "Pending" },
            { orderId: "B0000000009", orderDate: "2025-01-10", total: "3000$", status: "Complete" },
            { orderId: "D0000000004", orderDate: "2025-01-15", total: "4000$", status: "Pending" },
        ],
        requests: [
            {
                RequestTitle: "Broadband Installation",
                ServiceRequest: "Request to install a broadband internet connection.",
                EquipmentRequest: "Broadband Router Model BR123",
                DateCreate: "2025-01-01",
                IsResponse: false,
            },
            {
                RequestTitle: "Land-line Issue",
                ServiceRequest: "The land-line phone has no dial tone.",
                EquipmentRequest: "Replacement Handset Model LH456",
                DateCreate: "2025-01-01",
                IsResponse: false,
            },
            {
                RequestTitle: "Land-line Installation",
                ServiceRequest: "Request to install a new land-line phone.",
                EquipmentRequest: "Land-line Phone Model LL321",
                DateCreate: "2025-01-11",
                IsResponse: true,
            },
            {
                RequestTitle: "Dial-up Assistance",
                ServiceRequest: "Unable to connect to the internet using dial-up.",
                EquipmentRequest: "Dial-up Modem Model DM789",
                DateCreate: "2025-01-13",
                IsResponse: false,
            },
            
        ],
        supports: [
            {
                DateRequest: "2025-01-13",
                Title: "Request for Broadband Repair",
                DetailContent: "The broadband connection is not working since yesterday evening.",
                IsResolved: false,
            },
            {
                DateRequest: "2025-01-10",
                Title : "Request for Land-line Repair",
                DetailContent : "Land-line phone is not working properly; there is a lot of static noise.",
                IsResolved: true,
            },
            {
                DateRequest: "2025-01-15",
                Title : "Help with Dial-up Internet Configuration",
                DetailContent : "Need assistance in configuring the dial-up connection for better speed.",
                IsResolved: false,
            },
        ],
    });

    const updateUser = (updatedFields) => {
        setUser((prev) => ({ ...prev, ...updatedFields }));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Grid container direction="column" sx={{ overflowX: "hidden", minHeight: "70vh" }}>
                    {/* Background Image */}
                    <Grid item xs={12} md={6}>
                        <img
                            alt="avatar"
                            style={{
                                width: "100vw",
                                height: "20vh",
                                objectFit: "cover",
                                objectPosition: "50% 50%",
                                position: "relative",
                            }}
                            src="https://iris2.gettimely.com/images/default-cover-image.jpg"
                        />
                    </Grid>

                    {/* Components */}
                    <Grid
                        container
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                        sx={{
                            position: "absolute",
                            top: "30vh",
                            px: { xs: 2, md: 7 },
                            
                        }}
                    >
                        {/* Profile Card */}
                        <Grid item md={3}>
                            <ProfileCard
                                name={user.fullName}
                                sub={user.email}
                                dt1={user.dt1}
                                dt2={user.dt2}
                                dt3={user.dt3}
                            />
                        </Grid>

                        {/* Settings Card */}
                        <Grid item md={9}>
                            <SettingProfileCard user={user} updateUser={updateUser} />
                        </Grid>
                    </Grid>
                </Grid>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default ProfileUser;
