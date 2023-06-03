import React from "react";
import axios from "axios";

import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import * as router from "react-router";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Login from "../../pages/Login";

const navigate = jest.fn();
const mockStore = configureStore([]);

describe("Login component", () => {
  let store;
  let history;

  beforeEach(() => {
    store = mockStore({});
    history = createMemoryHistory();
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  const renderPage = () => {
    return render(
      <Provider store={store}>
        <Router history={history} location={history.location}>
          <Login />
        </Router>
      </Provider>
    );
  };

  test("renders the login form", () => {
    renderPage();
    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();
  });

  test("displays email error message when email is invalid", () => {
    renderPage();
    const emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.blur(emailInput);
    const emailError = screen.getByTestId("email-error");
    expect(emailError).toBeInTheDocument();
  });

  test("does not display email error message when email is valid", () => {
    renderPage();
    const emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, {
      target: { value: "validemail@example.com" },
    });
    fireEvent.blur(emailInput);
    const emailError = screen.queryByTestId("email-error");
    expect(emailError).toHaveClass("offscreen");
  });

  test("updates the email state when email input is changed", () => {
    renderPage();
    const emailInput = screen.getByTestId("email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  test("updates the password state when password input is changed", () => {
    renderPage();
    const passwordInput = screen.getByLabelText("Password:");
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  test("calls axios.post when login button is clicked with valid credentials", () => {
    axios.post = jest
      .fn()
      .mockResolvedValueOnce({ data: { token: "exampleToken" } });
    renderPage();
    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByLabelText("Password:");
    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);
    expect(axios.post).toHaveBeenCalledWith(
      "http://127.0.0.1:5000/user/login",
      JSON.stringify({ email: "test@example.com", password: "password123" }),
      { headers: { "Content-Type": "application/json" } }
    );
  });
  test("displays email input with placeholder text", () => {
    renderPage();
    const emailInput = screen.getByTestId("email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("placeholder", "Email");
  });
  test("displays an alert when ields are empty", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    axios.post.mockRejectedValueOnce({ response: { status: 400 } });

    renderPage();

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByLabelText("Password:");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(loginButton);

    expect(alertMock).toHaveBeenCalledTimes(1);

    alertMock.mockRestore();
  });
  test("displays forgot password link and navigates to password recovery page", () => {
    renderPage();
    const forgotPasswordLink = screen.getByText("Forgot the password?");
    expect(forgotPasswordLink).toBeInTheDocument();
  });
  test("could not verify", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    axios.post.mockRejectedValueOnce({ response: { status: 401 } });

    renderPage();

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByLabelText("Password:");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, {
      target: { value: "test_user_17@gmail.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "hello_boy123!T" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
    });

    alertMock.mockRestore();
  });
  test("no server response", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    renderPage();

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByLabelText("Password:");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, {
      target: { value: "test_user_17@gmail.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "hello_boy123!T" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledTimes(1);
    });

    alertMock.mockRestore();
  });
});
