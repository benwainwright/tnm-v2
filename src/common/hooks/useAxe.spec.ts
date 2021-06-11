import { renderHook } from "@testing-library/react-hooks";
import { useAxe } from "./useAxe";
import { mocked } from "ts-jest/utils";
import axe from "@axe-core/react";
import React from "react";
import ReactDom from "react-dom";

jest.mock("react-dom");
jest.mock("@axe-core/react");

describe("use axe", () => {
  afterEach(() => {
    delete process.env.NODE_ENV;
    jest.resetAllMocks();
  });

  it("should pass react and reactdom into the axe function", async () => {
    const { waitFor } = renderHook(() => useAxe());

    await waitFor(() =>
      expect(mocked(axe, true)).toBeCalledWith(React, ReactDom, 1000)
    );
  });

  it("should not do anything in production", async () => {
    process.env.NODE_ENV = "production";
    renderHook(() => useAxe());
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(mocked(axe, true)).not.toBeCalled();
  });
});
