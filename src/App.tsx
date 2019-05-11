import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideMenu from "./components/SideMenu/SideMenu";
import TopBar from "./components/TopBar/TopBar";
import CalendarPage from "./pages/CalendarPage";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

import "./App.scss";

const App: FunctionComponent = () => {
  return (
    <div className="page">
      <Router>
        <div className="side-menu-container">
          <SideMenu />
        </div>
        <main>
          <div className="top-bar-container">
            <TopBar />
          </div>
          <Switch>
            <Route exact={true} path="/" component={HomePage} />
            <Route exact={true} path="/reports" component={ReportsPage} />
            <Route exact={true} path="/gallery" component={GalleryPage} />
            <Route exact={true} path="/calendar" component={CalendarPage} />
            <Route exact={true} path="/settings" component={SettingsPage} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
