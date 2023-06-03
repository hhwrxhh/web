import React from "react";
import axios from "axios";

import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import configureStore from "redux-mock-store";
import * as router from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Register from "../../pages/Register";

describe("Register page design and logic", () => {
  const initialState = { iconObj: ["user", "pills"] };
  const mockStore = configureStore();
  const navigate = jest.fn();
  let store;
  const render_page = () => {
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <Register />
      </MemoryRouter>
    );
  };
  let alertMock;
  beforeEach(() => {
    alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  test("renders the registration form", () => {
    render_page();
    const registrationForm = screen.getByLabelText("User Name:");
    expect(registrationForm).toBeInTheDocument();
  });
  test("renders the email input field", () => {
    render_page();
    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();
  });
  test("renders the password input field", () => {
    render_page();
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();
  });
  test("renders the sign up button", () => {
    render_page();
    const signUpButton = screen.getByRole("button", {
      name: /sign up/i,
    });
    expect(signUpButton).toBeInTheDocument();
  });
  test("renders the login link for existing members", () => {
    render_page();
    const loginLink = screen.getByText("Login here");
    expect(loginLink).toBeInTheDocument();
  });

  test("displays error message when user with the same email already exists", async () => {
    jest
      .spyOn(axios, "post")
      .mockRejectedValueOnce({ response: { status: 409 } });

    render_page();

    const userNameInput = screen.getByLabelText("User Name:");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(userNameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Test123!" } });

    const signUpButton = screen.getByRole("button", {
      name: /sign up/i,
    });

    await act(async () => {
      fireEvent.click(signUpButton);
    });

    expect(alertMock).toHaveBeenCalledTimes(1);
  });

  test("displays success message and navigates to login page after successful registration", async () => {
    jest.spyOn(axios, "post").mockResolvedValueOnce({});

    render_page();

    const userNameInput = screen.getByLabelText("User Name:");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(userNameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Test123!" } });

    const signUpButton = screen.getByRole("button", {
      name: /sign up/i,
    });

    await act(async () => {
      fireEvent.click(signUpButton);
    });

    expect(alertMock).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith("/login");
  });

  test("displays email validation instructions when email field is focused", async () => {
    render_page();
    const emailInput = screen.getByPlaceholderText("Email");

    fireEvent.focus(emailInput);

    const validationInstructions = screen.getByText(
      "Must include @ and domain"
    );
    expect(validationInstructions).toBeInTheDocument();
  });
});
