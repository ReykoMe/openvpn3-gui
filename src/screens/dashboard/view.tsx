import React from "react";
import { useState } from "react";
import { Tab } from "@mui/material";
import { DashboardTabs } from "./components/dashboard-tabs";
import { ConnectionsDashboard } from "./components/connections-dashboard";
import { ConnectionsAll } from "./components/connections-all";

export const DashboardScreen: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<
    "importedConnections" | "allConnections"
  >("importedConnections");

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue as "importedConnections" | "allConnections");
  };
  return (
    <>
      <DashboardTabs
        value={currentTab}
        onChange={handleTabChange}
        variant="fullWidth"
      >
        <Tab label="Imported" value="importedConnections" />
        <Tab label="Non-imported" value="allConnections" />
      </DashboardTabs>
      {currentTab === "importedConnections" && <ConnectionsDashboard />}
      {currentTab === "allConnections" && <ConnectionsAll />}
    </>
  );
};
