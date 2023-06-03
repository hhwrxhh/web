import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { MemoryRouter } from "react-router-dom";

import NotFoundBlock from "../../components/NotFoundBlock/NotFoundBlock";


describe("NotFoundBlock", () => {
  test("renders the component without errors", () => {
    render(<NotFoundBlock />);
  });

  test("displays the 'Not Found' text", () => {
    render(
      <MemoryRouter>
        <NotFoundBlock />
      </MemoryRouter>
    );
    const notFoundText = screen.getByTestId("not_found");
    expect(notFoundText).toBeInTheDocument();
  });
});
