import React, { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProfileInput from "./ProfileInput";

function SettingProfileCard(props) {
    //TAB STATES
    const [valueTab, setValueTab] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };
    // GENDER SELECT STATES
    const genderSelect = [
        {
            value: "male",
            label: "Male"
        },
        {
            value: "female",
            label: "Female"
        }
    ];

    // FORM STATES
    const [user, setUser] = useState({
        // DEFAULT VALUES
        fullName: props.fullName,
        email: props.email,
        gender: props.gender,
        phone: props.phone,
        dateOfBirth: props.dateOfBirth,
    });

    const changeField = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    //BUTTON STATES
    const [edit, update] = useState({
        required: true,
        disabled: true,
        isEdit: true
    });

    // EDIT -> UPDATE
    const changeButton = (event) => {
        event.preventDefault();
        user.showPassword = false;
        edit.disabled = !edit.disabled;
        edit.isEdit = !edit.isEdit;
        update({ ...edit });
        console.log("user: ", user);
    };

    //RETURN
    return (
        <Card variant="outlined"
            sx={{
                height: "100%", width: "100%",
                background: "linear-gradient(to left, #89f7fe, #66a6ff)",
                borderRadius: "12px",
            }}
        >
            {/* TABS */}
            <br></br>
            <Tabs
                value={valueTab}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
            >
                <Tab value="1" label="Profile" />
                <Tab value="2" label="Change Password" />
                <Tab value="3" label="Order History" />
                <Tab value="4" label="Request History" />
                <Tab value="5" label="Support History" />
            </Tabs>
            <Divider></Divider>

            {/* MAIN CONTENT CONTAINER */}
            <form>
                <CardContent
                    sx={{
                        p: 3,
                        maxHeight: { md: "40vh" },
                        textAlign: { xs: "center", md: "start" }
                    }}
                >
                    {/* FIELDS */}
                    <FormControl fullWidth>
                        <Grid
                            container
                            direction={{ xs: "column", md: "row" }}
                            columnSpacing={5}
                            rowSpacing={3}
                        >
                            {/* FULL NAME */}
                            <Grid component="form" item xs={6}>
                                <ProfileInput
                                    id="fullName"
                                    name="fullName"
                                    value={user.fullName}
                                    onChange={changeField}
                                    title="Full Name"
                                    dis={edit.disabled}
                                    req={edit.required}
                                ></ProfileInput>
                            </Grid>
                            {/* EMAIL */}
                            <Grid item xs={6}>
                                <ProfileInput
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    onChange={changeField}
                                    title="Email Address"
                                    dis={edit.disabled}
                                    req={edit.required}
                                ></ProfileInput>
                            </Grid>

                            {/* GENDER */}
                            <Grid item xs={6}>
                                <ProfileInput
                                    select
                                    id="gender"
                                    name="gender"
                                    value={user.gender}
                                    onChange={changeField}
                                    title="Gender"
                                    dis={edit.disabled}
                                    req={edit.required}
                                    content={genderSelect.map((option) => (
                                        <MenuItem value={option.value}>{option.label}</MenuItem>
                                    ))}
                                ></ProfileInput>
                            </Grid>

                            {/* PHONE */}
                            <Grid item xs={6}>
                                <ProfileInput
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={user.phone}
                                    onChange={changeField}
                                    title="Phone Number"
                                    dis={edit.disabled}
                                    req={edit.required}
                                ></ProfileInput>
                            </Grid>

                            {/* DOB */}
                            <Grid item xs={6}>
                                <ProfileInput
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    value={user.dateOfBirth}
                                    onChange={changeField}
                                    title="Date Of Birth"
                                    dis={edit.disabled}
                                    req={edit.required}
                                ></ProfileInput>
                            </Grid>

                            {/* BUTTON */}
                            <Grid
                                container
                                justifyContent={{ xs: "left", md: "flex-start" }}
                                item
                                xs={12}
                            >
                                <Button
                                    sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                                    component="button"
                                    size="large"
                                    variant="contained"
                                    color={edit.isEdit === false ? "success" : "warning"}
                                    onClick={() => props.expose("hello")}
                                >
                                    {edit.isEdit === false ? "UPDATE" : "EDIT"}
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </CardContent>
            </form>
        </Card>
    );
}

export default SettingProfileCard;