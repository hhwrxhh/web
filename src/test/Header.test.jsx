import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store.js";
import "@testing-library/jest-dom";
import Header from "../components/Header/Header";
import axios from "axios";
jest.mock(axios);


describe("Header", () => {
  test("renders the logo", () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    const logoElement = getByText("Pharmacy");
    expect(logoElement).toBeInTheDocument();
  });

  test("navigates to /profile when user icon is clicked", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    const userIcon = getByLabelText("user");
    fireEvent.click(userIcon);
    expect(window.location.pathname).toBe("/profile");
  });

  // Add more tests for other functionality and scenarios
});
