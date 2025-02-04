import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import React, { useState } from "react";

const styles = {
    detailsprofile: {
        padding: "1rem",
        borderTop: "1px solid #e1e1e1"
    },
    valueprofile: {
        padding: "1rem 2rem",
        borderTop: "1px solid #e1e1e1",
        color: "#333333",
        fontWeight: "bold",
    }
};

function ProfileCard({ name, sub, dt1, dt2, dt3, avatar }) {
    const { customer } = useAuth(); // Lấy customer từ AuthContext
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(avatar || "~/default-avatar.png");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !customer?.id) {
            alert("Please select an image first.");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", selectedFile);
    
        try {
            const response = await axios.put(
                `http://localhost:5185/api/Customer/update-image/${customer.id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            alert("Avatar updated successfully!");
            setPreview(response.data.imageUrl);
        } catch (error) {
            console.error("Error updating avatar:", error.response?.data || error.message);
            alert("Failed to update avatar.");
        }
    };
    

    return (
        <Card
            variant="outlined"
            sx={{
                background: "linear-gradient(to right, #89f7fe, #66a6ff)",
                borderRadius: "12px",
            }}
        >
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                {/* CARD HEADER START */}
                <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
                    {/* PROFILE PHOTO */}
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        badgeContent={
                            <label htmlFor="avatar-upload">
                                <PhotoCameraIcon sx={{ border: "5px solid white", backgroundColor: "#ff558f", borderRadius: "50%", padding: ".2rem", width: 35, height: 35, cursor: "pointer" }} />
                                <input type="file" id="avatar-upload" style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />
                            </label>
                        }
                    >
                        <Avatar sx={{ width: 100, height: 100, mb: 1.5 }} src={preview}></Avatar>
                    </Badge>
                    {/* DESCRIPTION */}
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#1a1a1a",
                            fontWeight: "bold",
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        sx={{
                            color: "#555555",
                            fontWeight: "500",
                        }}
                    >
                        {sub}
                    </Typography>
                </Grid>
                {/* CARD HEADER END */}

                {/* detailsprofile */}
                <Grid container>
                    <Grid item xs={6}>
                        <Typography style={styles.detailsprofile}>Orders Placed</Typography>
                        <Typography style={styles.detailsprofile}>Loyalty Points</Typography>
                        <Typography style={styles.detailsprofile}>Member Since</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "end" }}>
                        <Typography style={styles.valueprofile}>{dt1}</Typography>
                        <Typography style={styles.valueprofile}>{dt2}</Typography>
                        <Typography style={styles.valueprofile}>{dt3}</Typography>
                    </Grid>
                </Grid>

                {/* BUTTON */}
                <Grid item style={styles.detailsprofile} sx={{ width: "75%" }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ width: "99%", p: 1, my: 2 }}
                        onClick={handleUpload} disabled={!selectedFile}
                    >
                        Change Avatar
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
}

export default ProfileCard;