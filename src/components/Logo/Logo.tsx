import React, { FunctionComponent } from "react";

import "./Logo.scss";

const Logo: FunctionComponent = (props) => {
  return (
    <>
      <i className="fas fa-socks logo" />
      <h1 className="dashboard-name">Socks Panel</h1>
    </>
  );
};

export default Logo;
