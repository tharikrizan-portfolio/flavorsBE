import React from "react";
import ReactDOM from "react-dom";
import InitialScreen from "./InitialScreen";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<InitialScreen />, div);
  ReactDOM.unmountComponentAtNode(div);
});
