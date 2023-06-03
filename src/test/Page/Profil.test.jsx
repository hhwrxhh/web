import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom";
import Profile from "../../pages/Profile";

jest.mock("axios");

describe("Profile Page", () => {
  const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  test("renders profile information correctly", async () => {
    const user = {
      user_name: "John Doe",
      email: "johndoe@example.com",
    };
    axios.get.mockResolvedValueOnce({ data: user });

    render(<Profile />);

    expect(await screen.findByText(user.user_name)).toBeInTheDocument();
    expect(await screen.findByText(user.email)).toBeInTheDocument();
  });

  waitFor;

  test("displays an error message when no server response", async () => {
    axios.get.mockRejectedValueOnce({});

    render(<Profile />);

    await waitFor(() => {});

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock.mock.calls[0][0]).toBe("No Server Response");

    alertMock.mockRestore();
  });

  test("allows the user to edit their profile name and save changes", async () => {
    const user = {
      user_name: "John Doe",
      email: "johndoe@example.com",
    };
    axios.get.mockResolvedValueOnce({ data: user });

    const updatedUser = {
      user_name: "Jane Smith",
      email: "janesmith@example.com",
    };
    axios.put.mockResolvedValueOnce({ data: updatedUser });

    render(<Profile />);

    expect(await screen.findByText(user.user_name)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(user.user_name), {
      target: { value: "Jane Smith" },
    });

    fireEvent.click(screen.getByText("Save Changes"));

    expect(await screen.findByText(updatedUser.user_name)).toBeInTheDocument();
  });
});
