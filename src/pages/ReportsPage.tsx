import React, { FunctionComponent } from "react";
import ProjectPool from "../components/ProjectPool/ProjectPool";
import SearchBar from "../components/SearchBar/SearchBar";
import SideLinedHeading from "../components/SideLinedHeading/SideLinedHeading";

import "./ReportsPage.scss";

const ActiveProjectPoolItems = [
  {
    projectDescription: "Some project description to widen paragraph",
    projectName: "Advaita",
  },
  {
    projectDescription: "Some project description to widen paragraph",
    projectName: "Vedanta",
  },
  {
    projectDescription: "Some project description to widen paragraph",
    projectName: "Santa",
  },
  {
    projectDescription: "Some project description to widen paragraph",
    projectName: "Deus",
  },
  {
    projectDescription: "Some project description to widen paragraph",
    projectName: "Omni",
  },
  {
    projectDescription: "Some project description to widen paragraph",
    projectName: "Sco",
  },
  {
    projectDescription: "Some project description to widen paragraph",
    projectName: "Fél",
  },
];

const ArchivedProjectPoolItems = [
  {
    iconColor: "#FCC52D",
    projectDescription: "Some other project description archived",
    projectName: "Renoir",
  },
];

const ReportsPage: FunctionComponent = (props) => {
  return (
    <div className="reports">
      <h1>Search Reports</h1>
      <SearchBar
        width="560px"
        placeholder="Type something"
      />
      <div className="reports__projects">
        <ProjectPool items={ActiveProjectPoolItems} title="Active Projects" />
        <ProjectPool items={ArchivedProjectPoolItems} title="Recently Archived" />
      </div>
    </div>
  );
};

export default ReportsPage;
