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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import showToast from "../../components/customerLogin/ShowToast";
import axios from "axios";

function ChangePasswordTab({ user, updateUser }) {
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
    const [loading, setLoading] = useState(false);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

    const handleChange = (event) => {
        setError("");
        setPasswords({ ...passwords, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!passwords.currentPassword || !passwords.newPassword) {
            setError("All fields are required!");
            return;
        }
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError("New password and confirm password do not match!");
            return;
        }
        // if (!passwordRegex.test(passwords.newPassword)) {
        //     showToast(
        //         [
        //             "Password must be at least 6 characters.",
        //             "Include:",
        //             "   • At least one uppercase letter.",
        //             "   • At least one lowercase letter.",
        //             "   • At least one number."
        //         ],
        //         "error", 
        //         3000
        //     );
        //     return;
        // }

        setLoading(true); 

        try {
            const response = await axios.put(
                `http://localhost:5185/api/Customer/change-password/${user.customerId}`,
                {
                    oldPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword
                }
            );

            showToast("Password updated successfully!", "success");
            updateUser({ ...user, passwordChanged: true });

            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to change password.";
            setError(errorMessage);
            showToast(errorMessage, "error");
        } finally {
            setLoading(false); 
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={8} md={6}>
                <Card variant="outlined" sx={{ width: "100%", background: "transparent", border: "none" }}>
                    <CardContent>
                        <h2 className="text-center">Change Password</h2>
                        <Divider sx={{ my: 1 }} />
                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <FormControl fullWidth>
                                <Grid container spacing={1} justifyContent="center">
                                    {/* Current Password */}
                                    <Grid item xs={10}>
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
                                                            onClick={() => togglePasswordVisibility("currentPassword")}
                                                            edge="end"
                                                        >
                                                            {showPassword.currentPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>

                                    {/* New Password */}
                                    <Grid item xs={10}>
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
                                                            onClick={() => togglePasswordVisibility("newPassword")}
                                                            edge="end"
                                                        >
                                                            {showPassword.newPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>

                                    {/* Confirm New Password */}
                                    <Grid item xs={10}>
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
                                                            onClick={() => togglePasswordVisibility("confirmPassword")}
                                                            edge="end"
                                                        >
                                                            {showPassword.confirmPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>

                                    {/* Error Message */}
                                    {error && (
                                        <Grid item xs={10}>
                                            <p style={{ color: "red", textAlign: "center" }}>
                                                {error}
                                            </p>
                                        </Grid>
                                    )}

                                    {/* Update Password Button */}
                                    <Grid container justifyContent="center" item xs={6}>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            type="submit"
                                            disabled={loading} // Chặn bấm khi đang tải
                                            sx={{ py: 1.5, width: "100%" }}
                                        >
                                            {loading ? "Updating..." : "Update Password"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
            <ToastContainer/>
        </Grid>
    );
}

export default ChangePasswordTab;
