import React, { useState } from "react";
import { Grid, MenuItem, CardContent, FormControl, Button, Typography } from "@mui/material";
import ProfileInput from "./ProfileInput";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import showToast from "../../components/customerLogin/ShowToast";

function ProfileTab({ user, updateUser }) {
    const [localUser, setLocalUser] = useState(user);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
    
        if (!localUser.fullName.trim()) {
            newErrors.fullName = "Full Name cannot be empty.";
        }
        if (!localUser.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number cannot be empty.";
        } else if (!/^\d{10,11}$/.test(localUser.phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be 10-11 digits.";
        }
    
        if (!localUser.gender) {
            newErrors.gender = "Please select a gender.";
        }
    
        if (!localUser.address.trim()) {
            newErrors.address = "Address cannot be empty.";
        }
    
        if (!localUser.dateOfBirth) {
            newErrors.dateOfBirth = "Please select a date of birth.";
        } else {
            const birthDate = new Date(localUser.dateOfBirth);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            if (age < 18) {
                newErrors.dateOfBirth = "User must be over 18 years old.";
            }
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLocalUser({ ...localUser, [name]: value });
    };

    const handleSave = async () => {
        if (!validate()) return;

        if (
            localUser.fullName === user.fullName &&
            localUser.phoneNumber === user.phoneNumber &&
            localUser.gender === user.gender &&
            localUser.address === user.address &&
            localUser.dateOfBirth === user.dateOfBirth
        ) {
            showToast("No changes to save", "info");
            setEditMode(false);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:5185/api/Customer/update-info/${user.customerId}`, {
                fullName: localUser.fullName,
                phoneNumber: localUser.phoneNumber,
                gender: localUser.gender,
                address: localUser.address,
                DOB: localUser.dateOfBirth,
            });

            if (response.status === 200) {
                updateUser(response.data.data);
                setEditMode(false);
                showToast("Profile updated successfully", "success");
                fetchCustomerData(user.email);
            }
        } catch (error) {
            showToast(error.response?.data?.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form>
            <CardContent sx={{ p: 3 }}>
                <FormControl fullWidth>
                    <Grid container spacing={3}>
                        {/* Full Name */}
                        <Grid item xs={6}>
                            <ProfileInput
                                id="fullName"
                                name="fullName"
                                value={localUser.fullName}
                                onChange={handleChange}
                                title="Full Name"
                                dis={!editMode}
                            />
                            <Typography color="error">{errors.fullName || " "}</Typography>
                        </Grid>
                        {/* Email */}
                        <Grid item xs={6}>
                            <ProfileInput
                                id="email"
                                name="email"
                                value={localUser.email}
                                title="Email"
                                dis={true}
                            />
                        </Grid>
                        {/* Gender */}
                        <Grid item xs={6}>
                            <ProfileInput
                                select
                                id="gender"
                                name="gender"
                                value={localUser.gender}
                                onChange={handleChange}
                                title="Gender"
                                dis={!editMode}
                                content={[
                                    <MenuItem key="male" value="Male">Male</MenuItem>,
                                    <MenuItem key="female" value="Female">Female</MenuItem>,
                                ]}
                            />
                            <Typography color="error">{errors.gender || " "}</Typography>
                        </Grid>
                        {/* Phone */}
                        <Grid item xs={6}>
                            <ProfileInput
                                id="phone"
                                name="phoneNumber"
                                value={localUser.phoneNumber}
                                onChange={handleChange}
                                title="Phone"
                                dis={!editMode}
                            />
                            <Typography color="error">{errors.phoneNumber || " "}</Typography>
                        </Grid>
                        {/* Date of Birth */}
                        <Grid item xs={6}>
                            <ProfileInput
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={localUser.dateOfBirth ? new Date(localUser.dateOfBirth).toISOString().slice(0, 10) : ""}
                                onChange={handleChange}
                                title="Date of Birth"
                                dis={!editMode}
                            />
                            <Typography color="error">{errors.dateOfBirth || " "}</Typography>
                        </Grid>
                        {/* Address */}
                        <Grid item xs={6}>
                            <ProfileInput
                                id="address"
                                name="address"
                                value={localUser.address || ""}
                                onChange={handleChange}
                                title="Address"
                                dis={!editMode}
                            />
                            <Typography color="error">{errors.address || " "}</Typography>
                        </Grid>
                        {/* Buttons */}
                        <Grid item xs={12}>
                            <Button
                                onClick={() => {
                                    setEditMode(!editMode);
                                    if (editMode) {
                                        setLocalUser(user); // Reset về dữ liệu gốc
                                        setErrors({}); // Xóa lỗi
                                    }
                                }}
                                variant="contained"
                                color={editMode ? "secondary" : "warning"}
                                disabled={loading}
                            >
                                {editMode ? "Cancel" : "Update"}
                            </Button>
                            {editMode && (
                                <Button onClick={handleSave} variant="contained" color="success" sx={{ ml: 2 }} disabled={loading}>
                                    {loading ? "Saving..." : "Save"}
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </FormControl>
            </CardContent>
            <ToastContainer/>
        </form>
    );
}

export default ProfileTab;
