import { faSocks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";

import "./Logo.scss";

const Logo: FunctionComponent = (props) => {
  return (
    <>
      <FontAwesomeIcon icon={faSocks} className="logo" />
      <h1 className="dashboard-name">Socks Panel</h1>
    </>
  );
};

export default Logo;
