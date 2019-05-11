import React, { FunctionComponent } from "react";
import Logo from "../Logo/Logo";
import SideMenuLink from "./SideMenuLink/SideMenuLink";

import "./SideMenu.scss";

const SideMenu: FunctionComponent = () => {
  return (
    <div className="side-menu">
      <Logo />
      <SideMenuLink to="/" icon="fa-home">Home</SideMenuLink>
      <SideMenuLink to="/reports" icon="fa-file-signature">Reports</SideMenuLink>
      <SideMenuLink to="/analytics" icon="fa-chart-area">Analytics</SideMenuLink>
      <SideMenuLink to="/calendar" icon="fa-calendar">Calendar</SideMenuLink>
      <SideMenuLink to="/gallery" icon="fa-images">Gallery</SideMenuLink>
      <SideMenuLink to="/settings" icon="fa-cog">Settings</SideMenuLink>
    </div>
  );
};

export default SideMenu;
