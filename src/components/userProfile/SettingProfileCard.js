import React, { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProfileTab from "./ProfileTab";
import ChangePasswordTab from "./ChangePasswordTab";
import OrderHistoryTab from "./OrderHistoryTab";
import RequestHistoryTab from "./RequestHistoryTab";
import SupportHistoryTab from "./SupportHistoryTab";

function SettingProfileCard({ user, updateUser }) {
    const [valueTab, setValueTab] = useState("1");

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

    const renderTabContent = () => {
        switch (valueTab) {
            case "1":
                return <ProfileTab user={user} updateUser={updateUser} />;
            case "2":
                return <ChangePasswordTab />;
            case "3":
                return <OrderHistoryTab orders = {user.orders} />;
            case "4":
                return <RequestHistoryTab requests = {user.requests}/>;
            case "5":
                return <SupportHistoryTab supports = {user.supports}/>;
            default:
                return null;
        }
    };

    return (
        <Card
            variant="outlined"
            sx={{
                height: "100%",
                width: "100%",
                background: "linear-gradient(to left, #89f7fe, #66a6ff)",
                borderRadius: "12px",
            }}
        >
            {/* Tabs */}
            <br />
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
            <Divider />
            <div style={{ padding: "16px" }}>{renderTabContent()}</div>
        </Card>
    );
}

export default SettingProfileCard;
