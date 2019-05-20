import React, { FunctionComponent } from "react";
import Logo from "../Logo/Logo";
import SideMenuLink from "./SideMenuLink/SideMenuLink";

import "./SideMenu.scss";

const SideMenu: FunctionComponent = () => {
  return (
    <div className="side-menu">
      <Logo />
      <SideMenuLink to="/" icon="home">Home</SideMenuLink>
      <SideMenuLink to="/reports" icon="file-signature">Reports</SideMenuLink>
      <SideMenuLink to="/analytics" icon="chart-area">Analytics</SideMenuLink>
      <SideMenuLink to="/calendar" icon="calendar">Calendar</SideMenuLink>
      <SideMenuLink to="/gallery" icon="images">Gallery</SideMenuLink>
      <SideMenuLink to="/settings" icon="cog">Settings</SideMenuLink>
    </div>
  );
};

export default SideMenu;
