import React, { FunctionComponent } from "react";
import SwitchButton from "../SwitchButton/SwitchButton";

import "./Setting.scss";

const Setting: FunctionComponent<{
  active: boolean,
}> = (props) => {
  const { active, children } = props;
  return (
    <div className="setting">
      <div className="setting__content">
        {children}
      </div>
      <div className="setting__switch">
        <SwitchButton 
          isChecked={active}
        />
      </div>
    </div>
  )
}

export default Setting;
