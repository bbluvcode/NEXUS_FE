import React, { useState } from "react";
import { Grid, MenuItem, CardContent, FormControl, Button } from "@mui/material";
import ProfileInput from "./ProfileInput";

function ProfileTab({ user, updateUser }) {
    const [localUser, setLocalUser] = useState(user);
    const [editMode, setEditMode] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLocalUser({ ...localUser, [name]: value });
    };

    const handleSave = () => {
        updateUser(localUser);
        setEditMode(false); 
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
                        </Grid>
                        {/* Email */}
                        <Grid item xs={6}>
                            <ProfileInput
                                id="email"
                                name="email"
                                value={localUser.email}
                                onChange={handleChange}
                                title="Email"
                                dis={!editMode}
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
                                    <MenuItem value="male">Male</MenuItem>,
                                    <MenuItem value="female">Female</MenuItem>,
                                ]}
                            />
                        </Grid>
                        {/* Phone */}
                        <Grid item xs={6}>
                            <ProfileInput
                                id="phone"
                                name="phone"
                                value={localUser.phone}
                                onChange={handleChange}
                                title="Phone"
                                dis={!editMode}
                            />
                        </Grid>
                        {/* Date of Birth */}
                        <Grid item xs={6}>
                            <ProfileInput
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={localUser.dateOfBirth}
                                onChange={handleChange}
                                title="Date of Birth"
                                dis={!editMode}
                            />
                        </Grid>
                        {/* Buttons */}
                        <Grid item xs={12}>
                            <Button
                                onClick={() => setEditMode(!editMode)}
                                variant="contained"
                                color={editMode ? "secondary" : "warning"}
                            >
                                {editMode ? "Cancel" : "Edit"}
                            </Button>
                            {editMode && (
                                <Button onClick={handleSave} variant="contained" color="success" sx={{ ml: 2 }}>
                                    Save
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </FormControl>
            </CardContent>
        </form>
    );
}

export default ProfileTab;
