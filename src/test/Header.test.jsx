import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";

import "@testing-library/jest-dom";
import Header from "../components/Header/Header";
import axios from "axios";

describe("Header", () => {
  test("renders the logo", () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    const logoElement = screen.getByText("Pharmacy");
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
    
    // const userIcon = screen.getByLabelText("user");
    const userIcon = screen.getByTestId("user");
    fireEvent.click(userIcon);
    expect(window.location.pathname).toBe("/login");
    // const userIcon = screen.getByRole("svg", { name: /user/i }); // Assuming the SVG has an accessible name for screen readers
    // expect(userIcon).toHaveAttribute("icon", "user");
    // expect(userIcon).toHaveAttribute("data-icon", "user");
  });

  // Add more tests for other functionality and scenarios
});
