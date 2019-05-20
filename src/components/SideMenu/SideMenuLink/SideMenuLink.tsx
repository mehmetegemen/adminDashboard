import {
  faCalendar,
  faChartArea,
  faCog,
  faFileSignature,
  faHome,
  faImages,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import './SideMenuLink.scss';

const SideMenuLink: FunctionComponent<{
  to: string;
  icon: string;
}> = (props) => {
  const { to, icon, children } = props;
  let faIcon = faHome;
  if (icon === "home") {
    faIcon = faHome;
  } else if (icon === "file-signature") {
    faIcon = faFileSignature;
  } else if (icon === "chart-area") {
    faIcon = faChartArea;
  } else if (icon === "calendar") {
    faIcon = faCalendar;
  } else if (icon === "images") {
    faIcon = faImages;
  } else if (icon === "cog") {
    faIcon = faCog;
  } 
  return (
    <Link to={to} className="side-menu-link">
      <FontAwesomeIcon icon={faIcon} />
      {children}
    </Link>
  );
};

export default SideMenuLink;
