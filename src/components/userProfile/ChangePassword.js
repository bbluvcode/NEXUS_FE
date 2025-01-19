import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import ProfileInput from "./ProfileInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function ChangePassword() {
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {
        setError("");
        setPasswords({ ...passwords, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError("New password and confirm password do not match!");
            return;
        }
        if (!passwords.currentPassword || !passwords.newPassword) {
            setError("All fields are required!");
            return;
        }

        setError("");
        console.log("Passwords updated successfully: ", passwords);

        setPasswords({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
    };

    // show/hide password
    const togglePasswordVisibility = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "100vh", }}
        >
            <Grid item xs={12} sm={8} md={6}
                sx={{
                    position: "relative",
                    top: { xs: "-10vh", md: "-15vh" },
                    px: { xs: 2, md: 7 },                  
                }}
            >
                <Card variant="outlined" sx={{ color: "white", width: "100%", background: "linear-gradient(to bottom right, #f6d365, #fda085)",borderRadius: "25px", }}>
                    <CardContent>
                        <h2 className="text-center">Change Password</h2>
                        <Divider sx={{ my: 3 }} />

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <FormControl fullWidth>
                                <Grid container spacing={3} justifyContent="center">
                                    {/* Current Password */}
                                    <Grid item xs={8}>
                                        <ProfileInput
                                            id="currentPassword"
                                            name="currentPassword"
                                            type={showPassword.currentPassword ? "text" : "password"}
                                            value={passwords.currentPassword}
                                            onChange={handleChange}
                                            title="Current Password"
                                            req={true}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() =>
                                                                togglePasswordVisibility("currentPassword")
                                                            }
                                                            edge="end"
                                                        >
                                                            {showPassword.currentPassword ? (
                                                                <Visibility />
                                                            ) : (
                                                                <VisibilityOff />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>

                                    {/* New Password */}
                                    <Grid item xs={8}>
                                        <ProfileInput
                                            id="newPassword"
                                            name="newPassword"
                                            type={showPassword.newPassword ? "text" : "password"}
                                            value={passwords.newPassword}
                                            onChange={handleChange}
                                            title="New Password"
                                            req={true}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() =>
                                                                togglePasswordVisibility("newPassword")
                                                            }
                                                            edge="end"
                                                        >
                                                            {showPassword.newPassword ? (
                                                                <Visibility />
                                                            ) : (
                                                                <VisibilityOff />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>

                                    {/* Confirm New Password */}
                                    <Grid item xs={8}>
                                        <ProfileInput
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showPassword.confirmPassword ? "text" : "password"}
                                            value={passwords.confirmPassword}
                                            onChange={handleChange}
                                            title="Confirm New Password"
                                            req={true}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() =>
                                                                togglePasswordVisibility("confirmPassword")
                                                            }
                                                            edge="end"
                                                        >
                                                            {showPassword.confirmPassword ? (
                                                                <Visibility />
                                                            ) : (
                                                                <VisibilityOff />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>

                                    {/* Error Message */}
                                    {error && (
                                        <Grid item xs={8}>
                                            <p style={{ color: "red", textAlign: "center" }}>
                                                {error}
                                            </p>
                                        </Grid>
                                    )}

                                    {/* Update Password Button */}
                                    <Grid
                                        container
                                        justifyContent="center"
                                        item
                                        xs={6}
                                    >
                                        <Button
                                            variant="contained"
                                            color="success"
                                            type="submit"
                                            sx={{ py: 1.5, width: "100%", borderRadius: "8px", }}
                                        >
                                            Update Password
                                        </Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default ChangePassword;
