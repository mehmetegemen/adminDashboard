import React, { FunctionComponent } from "react";
import Setting from "../components/Setting/Setting";
import SideLinedHeading from "../components/SideLinedHeading/SideLinedHeading";

import "./SettingsPage.scss";

const SettingsPage: FunctionComponent = (props) => {
  return (
    <div className="settings-page">
      <h1 className="settings-page__title">Settings</h1>
      <SideLinedHeading>General Settings</SideLinedHeading>
      <Setting active={false}>Desktop Notifications</Setting>
      <Setting active={true}>
        Accessibility Mode
        <br/>
        <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.</small>
      </Setting>
      <Setting active={true}>Light Theme</Setting>
      <SideLinedHeading>Privacy Settings</SideLinedHeading>
      <Setting active={false}>Send me email notifications</Setting>
    </div>
  );
}

export default SettingsPage;
