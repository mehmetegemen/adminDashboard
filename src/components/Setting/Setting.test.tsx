import { mount, shallow } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
import getComponentImage from "../../utils/getComponentImage";
import { generateStyle, removeStyle } from "../../utils/importStyles";
import Setting from "./Setting";
import "./Setting.scss";
import path from "path";

test("component renders", () => {
  const wrapper = shallow(<Setting active={true} />);
  expect(wrapper).toMatchSnapshot();
});

test("should recieve props", () => {
  const wrapper = mount(<Setting active={true} />);
  expect(wrapper.prop("active")).toEqual(true);

  wrapper.setProps({active: false});
  expect(wrapper.prop("active")).toEqual(false);

  wrapper.unmount();
});

test("should look proper when checked", async () => {
  const div = document.createElement("div");
  document.body.appendChild(div);
  ReactDOM.render(<Setting active={true} />, div);
  await generateStyle(
    {
      filePaths: [
        path.normalize(__dirname + "/Setting.scss"),
        path.normalize(__dirname + "/../SwitchButton/SwitchButton.scss")
      ],
      // I have no idea why this is working and normal implementations don't
      includePaths: [path.normalize(__dirname + "master.scss")],
    }
  )

  const screenshot = await getComponentImage();
  expect(screenshot).toMatchImageSnapshot();

  // console.log(document.documentElement.outerHTML);

  removeStyle();
  ReactDOM.unmountComponentAtNode(div);
  document.body.removeChild(div);
});

test("should look proper when unchecked", async () => {
  const div = document.createElement("div");
  document.body.appendChild(div);
  ReactDOM.render(<Setting active={false} />, div);
  await generateStyle(
    {
      filePaths: [
        path.normalize(__dirname + "/Setting.scss"),
        path.normalize(__dirname + "/../SwitchButton/SwitchButton.scss")
      ],
      // I have no idea why this is working and normal implementations don't
      includePaths: [path.normalize(__dirname + "master.scss")],
    }
  )

  const screenshot = await getComponentImage();
  expect(screenshot).toMatchImageSnapshot();

  // console.log(document.documentElement.outerHTML);

  removeStyle();
  ReactDOM.unmountComponentAtNode(div);
  document.body.removeChild(div);
});

test("should look proper with description", async () => {
  const div = document.createElement("div");
  document.body.appendChild(div);
  ReactDOM.render(<Setting active={true}>Example description</Setting>, div);
  await generateStyle(
    {
      filePaths: [
        path.normalize(__dirname + "/Setting.scss"),
        path.normalize(__dirname + "/../SwitchButton/SwitchButton.scss")
      ],
      // I have no idea why this is working and normal implementations don't
      includePaths: [path.normalize(__dirname + "master.scss")],
    }
  )

  const screenshot = await getComponentImage();
  expect(screenshot).toMatchImageSnapshot();

  // console.log(document.documentElement.outerHTML);

  removeStyle();
  ReactDOM.unmountComponentAtNode(div);
  document.body.removeChild(div);
});
