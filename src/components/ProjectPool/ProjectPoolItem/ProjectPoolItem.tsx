import React, { FunctionComponent, useState } from "react";

import "./ProjectPoolItem.scss";

const ProjectPoolItem: FunctionComponent<{
  projectName: string,
  projectDescription: string,
  iconColor?: string,
}> = (props) => {
  const [hoverToggle, setHoverToggle] = useState(false);
  const { projectName, projectDescription, iconColor } = props;
  const handleHover = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (event.type === "mouseenter") {
      setHoverToggle(true);
    } else if (event.type === "mouseleave") {
      setHoverToggle(false);
    }
  };
  return (
    <div
      className="project-pool-item"
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      style={{borderColor: hoverToggle ? iconColor ? iconColor : "#1071E2" : "#EEE"}}
    >
      <i
        className="far fa-copy"
        aria-hidden="true"
        style={{color: iconColor ? iconColor : "#1071E2"}}
      />
      <h3>{projectName}</h3>
      <p>{projectDescription}</p>
    </div>
  );
};

export default ProjectPoolItem;
