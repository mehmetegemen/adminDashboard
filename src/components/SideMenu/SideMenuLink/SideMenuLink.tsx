import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import "./SideMenuLink.scss";

const SideMenuLink: FunctionComponent<{
  to: string,
  icon: string,
}> = (props) => {
  const { to, icon, children } = props;
  return (
    <Link to={to} className="side-menu-link">
      <i className={`fas ${icon}`} />{children}
    </Link>
  );
};

export default SideMenuLink;
