import React, { FunctionComponent, useRef, useState } from "react";

import "./SwitchButton.scss";

const SwitchButton: FunctionComponent<{
  isChecked: boolean,
}> = (props) => {
  const { isChecked } = props;
  const swtch = useRef(null);
  const [state, setState] = useState({isChecked});
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setState({isChecked: !state.isChecked});
  };
  return (
    <div className="switch-container">
      <label>
        <input
          ref={swtch}
          checked={state.isChecked}
          onChange={handleChange}
          className="switch"
          type="checkbox"
        />
        <div>
          <div />
        </div>
      </label>
    </div>
  );
};

export default SwitchButton;
