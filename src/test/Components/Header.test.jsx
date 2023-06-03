import React from "react";

import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import * as router from "react-router";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import Header from "../../components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navigate = jest.fn();
const mockStore = configureStore([]);

describe("Header component", () => {
  let store;
  let history;

  beforeEach(() => {
    store = mockStore({
      iconSlice: {
        iconObj: [
          "user",
          "shopping-cart",
          "pills",
          "users",
          "edit",
          "right-from-bracket",
        ],
      },
      filterSlice: {
        isClickedIcon: false,
      },
    });
    history = createMemoryHistory();
  });

  const renderPage = () => {
    return render(
      <Provider store={store}>
        <Router history={history} location={history.location}>
          <Header />
        </Router>
      </Provider>
    );
  };
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  test("renders the logo text", () => {
    renderPage();

    const logoText = screen.getByText("Pharmacy");
    expect(logoText).toBeInTheDocument();
  });

  it("should navigate to '/products' when pills icon is clicked", () => {
    renderPage();
    const pillsIcon = screen.getByTestId("pills");
    fireEvent.click(pillsIcon);
    expect(navigate).toHaveBeenCalledWith("/products");
  });

  it("should navigate to '/cart' when shopping-cart icon is clicked", () => {
    renderPage();
    const shoppingCartIcon = screen.getByTestId("shopping-cart");
    fireEvent.click(shoppingCartIcon);
    expect(navigate).toHaveBeenCalledWith("/cart");
  });

  it("should navigate to '/profile' when user icon is clicked", () => {
    renderPage();
    const userIcon = screen.getByTestId("user");
    fireEvent.click(userIcon);
    expect(navigate).toHaveBeenCalledWith("/profile");
  });
  it("should navigate to '/admin/edit/users' when users icon is clicked", () => {
    renderPage();
    const editUsersIcon = screen.getByTestId("users");
    fireEvent.click(editUsersIcon);
    expect(navigate).toHaveBeenCalledWith("/admin/edit/users");
  });
  it("should navigate to '/admin/edit/pharmacy' when edit icon is clicked", () => {
    renderPage();
    const editIcon = screen.getByTestId("edit");
    fireEvent.click(editIcon);
    expect(navigate).toHaveBeenCalledWith("/admin/edit/pharmacy");
  });
  it("should navigate to '/login' when right-from-bracket icon is clicked", () => {
    renderPage();
    const logoutIcon = screen.getByTestId("right-from-bracket");
    fireEvent.click(logoutIcon);
    expect(sessionStorage.length).toBe(0);
    expect(navigate).toHaveBeenCalledWith("/login");
  });
});
