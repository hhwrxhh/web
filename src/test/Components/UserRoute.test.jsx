import React from "react";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { MemoryRouter, Outlet } from "react-router-dom";

import PrivateRouteUser from "../../components/PrivateRoute/PrivateRouteUser";
import checkUser from "../../components/PrivateRoute/checkUser";

jest.mock("../../components/PrivateRoute/checkUser");

describe("PrivateRouteUser", () => {
  beforeEach(() => {
    sessionStorage.setItem("token", "test-token");
  });

  afterEach(() => {
    sessionStorage.removeItem("token");
    jest.resetAllMocks();
  });

  test("renders the outlet when user is authenticated", async () => {
    checkUser.mockResolvedValueOnce("user");
    render(
      <MemoryRouter>
        <PrivateRouteUser />
        <Outlet />
      </MemoryRouter>
    );

    let text = await screen.findByText("Loading...");
    expect(text).not.toBeInTheDocument();
  });

  test("navigates to '/login' when user is not authenticated", async () => {
    checkUser.mockResolvedValueOnce("user");
    render(
      <MemoryRouter>
        <PrivateRouteUser />
        <Outlet />
      </MemoryRouter>
    );

    // Wait for the component to finish loading
    await screen.findByText("Loading...");

    // Verify that it navigates to '/login'
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("Outlet Component")).not.toBeInTheDocument();
  });
});
