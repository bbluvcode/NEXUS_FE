/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileCard from "./ProfileCard";
import SettingProfileCard from "./SettingProfileCard";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

// FONTS
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme();

function ProfileUser() {
  const { customer } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (customer?.email) {
      fetchCustomerData(customer.email);
    }
  }, [customer]);

  const fetchCustomerData = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5185/api/Customer/customer-by-email/${email}`);
      setUser(response.data.data);
      console.log("User: ", response.data.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => ({ 
      ...prev, 
      ...updatedFields,
      accounts: updatedFields.accounts || prev.accounts,
      customerRequests: updatedFields.customerRequests || prev.customerRequests }));
  };

  if (!user) {
    return <p>Loading customer data...</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Grid container direction="column" sx={{ overflowX: "hidden", minHeight: "100vh" }}>
          <Grid
            container
            spacing={3}
            sx={{
              position: "absolute",
              top: "30vh",
              mt: { xs: 3, md: 5 },
              px: { xs: 2, md: 7 },
            }}
          >
            {/* Profile Card */}
            <Grid item xs={12} md={3}>
              <ProfileCard
                name={user.fullName}
                sub={user.email}
                dt1={Array.isArray(user.accounts) ? user.accounts.length : 0}
                dt2={Array.isArray(user.accounts) ? user.accounts.length * 10 : 0}
                dt3={(Array.isArray(user?.customerRequests) && user.customerRequests.length > 0 && user.customerRequests[0]?.dateCreate)
                  ? new Date(user.customerRequests[0].dateCreate).toISOString().split("T")[0]
                  : "N/A"}              
              />
            </Grid>

            {/* Settings Card */}
            <Grid item xs={12} md={9}>
              <SettingProfileCard user={user} updateUser={updateUser} />
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default ProfileUser;
