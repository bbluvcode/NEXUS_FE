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

function ProfileUser(props) {
    const [text, setText] = useState("");
    const mainUser = {
        // DEFAULT VALUES
        dt1: "5 Orders",
        dt2: "150 Points",
        dt3: "01/2024",
        fullName: "Nguyen Van ABC",
        gender: "male",
        phone: "0123456789",
        email: "abc@gmail.com",
        dateOfBirth: "2000-01-01"
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    {/* BACKGROUND */}
                    <Grid
                        container
                        direction="column"
                        sx={{
                            minHeight: "calc(100vh)", 
                            overflowX: "hidden",
                        }}
                    >
                        <Grid item xs={12} md={6}>
                            <img
                                alt="avatar"
                                style={{
                                    width: "100%",
                                    height: "35vh",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                                src="https://iris2.gettimely.com/images/default-cover-image.jpg"
                            />
                        </Grid>

                        {/* COMPONENTS */}
                        <Grid
                            container
                            direction={{ xs: "column", md: "row" }}
                            spacing={3}
                            sx={{
                                position: "relative",
                                top: { xs: "-10vh", md: "-15vh" },
                                px: { xs: 2, md: 7 },
                            }}
                        >
                            {/* PROFILE CARD */}
                            <Grid item md={3}>
                                <ProfileCard
                                    name={mainUser.fullName}
                                    sub={mainUser.email}
                                    dt1={mainUser.dt1}
                                    dt2={mainUser.dt2}
                                    dt3={mainUser.dt3}
                                ></ProfileCard>
                            </Grid>

                            {/* SETTINGS CARD */}
                            <Grid item md={9}>
                                <SettingProfileCard
                                    expose={(v) => setText(v)}
                                    fullName={mainUser.fullName}
                                    phone={mainUser.phone}
                                    email={mainUser.email}
                                    gender={mainUser.gender}
                                    dateOfBirth={mainUser.dateOfBirth}
                                ></SettingProfileCard>
                            </Grid>
                        </Grid>
                    </Grid>
                </CssBaseline>
            </ThemeProvider>
        </div>
    );
}

export default ProfileUser;