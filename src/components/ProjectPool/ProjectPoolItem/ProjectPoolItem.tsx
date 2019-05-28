import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <FontAwesomeIcon
        icon={faCopy}
        style={{color: iconColor ? iconColor : "#1071E2", "font-size": "42px"}}
      />
      <h3>{projectName}</h3>
      <p>{projectDescription}</p>
    </div>
  );
};

export default ProjectPoolItem;
