import React, { FunctionComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import getQueryString from "../../utils/getQueryString";
import SideLinedHeading from "../SideLinedHeading/SideLinedHeading";
import IProjectPoolItem from "./ProjectPoolItem/IProjectPoolItem";
import ProjectPoolItem from "./ProjectPoolItem/ProjectPoolItem";

import "./ProjectPool.scss";

const ProjectPool: FunctionComponent<RouteComponentProps & {
  items: IProjectPoolItem[],
  title: string, 
}> = (props) => {
  const { items, title } = props;

  const searchQueryString = getQueryString(
    {
      query: "search",
      search: props.location.search,
    },
  );
  const filteredItems =
    searchQueryString
    ? items.filter(
      (item) => {
        const searchTerm = searchQueryString.toLowerCase();
        return item.projectName.toLowerCase().search(searchTerm) !== -1
        || item.projectDescription.toLowerCase().search(searchTerm) !== -1;
      })
    : items;
  const projectItems = filteredItems.map((item, index) => (
    <ProjectPoolItem
      projectName={item.projectName}
      projectDescription={item.projectDescription}
      iconColor={item.iconColor}
      key={index}
    />
  ));
  return (
    <div>
      <SideLinedHeading>{title}</SideLinedHeading>
      <div className="project-pool">
        <div className="project-pool__items">
          {projectItems.length > 0 ? projectItems : null}
        </div>
      </div>
      {projectItems.length === 0
        ? <div className="project-pool__items__warning">No reports found</div>
        : null}
    </div>
  );
};

export default withRouter(ProjectPool);
