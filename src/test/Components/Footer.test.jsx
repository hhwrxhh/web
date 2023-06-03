import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Footer from "../../components/Footer/Footer";

describe("Footer Component", () => {
  it("should render Locations column with correct titles", () => {
    render(<Footer />);
    const locationsColumn = screen.getByText("Locations");
    expect(locationsColumn).toBeInTheDocument();

    const town1 = screen.getByText("Town 1");
    expect(town1).toBeInTheDocument();

    const town2 = screen.getByText("Town 2");
    expect(town2).toBeInTheDocument();

    const town3 = screen.getByText("Town 3");
    expect(town3).toBeInTheDocument();

    const town4 = screen.getByText("Town 4");
    expect(town4).toBeInTheDocument();
  });

  it("should render Contacts column with correct titles", () => {
    render(<Footer />);
    const contactsColumn = screen.getByText("Contacts");
    expect(contactsColumn).toBeInTheDocument();

    const address = screen.getByText("Town 1, Country 1, 38900");
    expect(address).toBeInTheDocument();

    const email = screen.getByText("Pharmacy@gmail.com");
    expect(email).toBeInTheDocument();

    const phone = screen.getByText("555-100-333");
    expect(phone).toBeInTheDocument();
  });

  it("should render Common questions column with correct titles", () => {
    render(<Footer />);
    const commonQuestionsColumn = screen.getByText("Common questions");
    expect(commonQuestionsColumn).toBeInTheDocument();

    const aboutCompany = screen.getByText("About Company");
    expect(aboutCompany).toBeInTheDocument();

    const delivery = screen.getByText("delivery");
    expect(delivery).toBeInTheDocument();

    const payment = screen.getByText("Payment");
    expect(payment).toBeInTheDocument();

    const certifications = screen.getByText("Certifications");
    expect(certifications).toBeInTheDocument();
  });
});
