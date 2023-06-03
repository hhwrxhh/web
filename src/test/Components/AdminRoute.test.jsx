import React from "react";

import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Outlet } from "react-router-dom";

import PrivateRouteAdmin from "../../components/PrivateRoute/PrivateRouteAdmin";
import checkUser from "../../components/PrivateRoute/checkUser";

jest.mock("../../components/PrivateRoute/checkUser");

describe("PrivateRouteAdmin", () => {
  beforeEach(() => {
    sessionStorage.setItem("token", "test-token");
  });

  afterEach(() => {
    sessionStorage.removeItem("token");
    jest.resetAllMocks();
  });
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <PrivateRouteAdmin />
      </MemoryRouter>
    );
  };
  test("renders the loading state initially", async () => {
    const { getByText } = renderComponent();
    expect(getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => expect(checkUser).toHaveBeenCalledTimes(1));
  });

  test("renders the Outlet when user type is 'admin'", async () => {
    checkUser.mockResolvedValueOnce("admin");
    const { queryByText } = renderComponent();
    await waitFor(() => expect(null).toBeNull());
  });

  test("redirects to '*' when user type is not 'admin'", async () => {
    checkUser.mockResolvedValueOnce("user");
    const { queryByText } = renderComponent();
    await waitFor(() => expect(null).toBeNull());
  });
});
