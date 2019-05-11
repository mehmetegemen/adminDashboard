import React, { FunctionComponent } from "react";

import "./SideLinedHeading.scss";

const SideLinedHeading: FunctionComponent = (props) => {
  const { children } = props;
  return (
    <h4 className="side-lined-heading">
      {children}
    </h4>
  );
};

export default SideLinedHeading;
