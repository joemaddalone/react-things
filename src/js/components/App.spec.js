import React from "react";
import { render } from "react-testing-library";
import App from "./App";
import store from "../store";
import { Provider } from "react-redux";

describe("App", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByTestId("app-component")).toBeTruthy();
  });
});
