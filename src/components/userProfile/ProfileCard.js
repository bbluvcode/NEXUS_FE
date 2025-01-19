import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";

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

function ProfileCard(props) {
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
                            <PhotoCameraIcon
                                sx={{
                                    border: "5px solid white",
                                    backgroundColor: "#ff558f",
                                    borderRadius: "50%",
                                    padding: ".2rem",
                                    width: 35,
                                    height: 35
                                }}
                            ></PhotoCameraIcon>
                        }
                    >
                        <Avatar
                            sx={{ width: 100, height: 100, mb: 1.5 }}
                            src="~/default-avatar.png"
                        ></Avatar>
                    </Badge>

                    {/* DESCRIPTION */}
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#1a1a1a", 
                            fontWeight: "bold",
                        }}
                    >
                        {props.name}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        sx={{
                            color: "#555555", 
                            fontWeight: "500",
                        }}
                    >
                        {props.sub}
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
                        <Typography style={styles.valueprofile}>{props.dt1}</Typography>
                        <Typography style={styles.valueprofile}>{props.dt2}</Typography>
                        <Typography style={styles.valueprofile}>{props.dt3}</Typography>
                    </Grid>
                </Grid>

                {/* BUTTON */}
                <Grid item style={styles.detailsprofile} sx={{ width: "75%" }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ width: "99%", p: 1, my: 2 }}
                    >
                        Change Avatar
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
}

export default ProfileCard;