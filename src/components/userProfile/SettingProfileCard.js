import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProfileTab from "./ProfileTab";
import ChangePasswordTab from "./ChangePasswordTab";
import AccountAndConnectionTab from "./AccountAndConnectionTab";
import RequestHistoryTab from "./RequestHistoryTab";
import SupportHistoryTab from "./SupportHistoryTab";
import FeedbackHistoryTab from "./FeedbackHistoryTab";
import { useSearchParams } from 'react-router-dom';


function SettingProfileCard({ user, updateUser }) {
    const [valueTab, setValueTab] = useState("1");

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const tabParam = searchParams.get('tab');
        switch (tabParam) {
            case 'profile':
                setValueTab("1");
                break;
            case 'change-password':
                setValueTab("2");
                break;
            case 'account-connection':
                setValueTab("3");
                break;
            case 'request-history':
                setValueTab("4");
                break;
            case 'support-history':
                setValueTab("5");
                break;
            case 'feedback-history':
                setValueTab("6");
                break;
            default:
                setValueTab("1");
                break;
        }
    }, [searchParams]);

    const renderTabContent = () => {
        switch (valueTab) {
            case "1":
                return <ProfileTab user={user} updateUser={updateUser} />;
            case "2":
                return <ChangePasswordTab user={user} updateUser={updateUser} />;
            case "3":
                return <AccountAndConnectionTab accounts={user.accounts} />;
            case "4":
                return <RequestHistoryTab requests={user.customerRequests} />;
            case "5":
                return <SupportHistoryTab requests={user.supportRequests} />;
            case "6":
                return <FeedbackHistoryTab requests={user.feedBacks} />;
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
                <Tab value="3" label="Account and Connection" />
                <Tab value="4" label="Request History" />
                <Tab value="5" label="Support History" />
                <Tab value="6" label="Feedback History" />
            </Tabs>
            <Divider />
            <div style={{ padding: "16px" }}>{renderTabContent()}</div>
        </Card>
    );
}

export default SettingProfileCard;
