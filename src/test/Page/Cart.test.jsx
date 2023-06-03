import React from "react";
import { useState as useStateMock } from "react";
import axios from "axios";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { useDispatch, useSelector } from "react-redux";


import { Router } from "react-router-dom";
import configureStore from "redux-mock-store";

import { createMemoryHistory } from "history";
import { data } from "../../test_data/drug_data";
import Cart from "../../pages/Cart";


jest.mock("axios");
jest.mock("react-redux");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(), // Замокований useState
}));

describe("Cart component", () => {
  let store;
  let history;
  const tokenStr =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4NTUzODkwNywianRpIjoiODU3YmQzNjItZjZkMS00NDJlLWI3ZTUtNzg3NDM0MDdkNWVjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3RfdXNlcl8xN0BnbWFpbC5jb20iLCJuYmYiOjE2ODU1Mzg5MDcsImV4cCI6MTY4NTU0MjUwN30.n5iLBNosaUcRnlCyQOBMqwsMQHt_teVB2z9R7bEyl40";
  sessionStorage.setItem("token", tokenStr);
  const mockStore = configureStore();
  let setRenderMap, setTotalCount, setTotalPrice, setObj, deleteItem;

  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue([]);

    setRenderMap = jest.fn();
    useStateMock.mockReturnValueOnce([false, setRenderMap]); 
    setTotalCount = jest.fn();
    useStateMock.mockReturnValueOnce(["", setTotalCount]); 
    setTotalPrice = jest.fn();
    useStateMock.mockReturnValueOnce(["", setTotalPrice]); 
    setObj = jest.fn();
    useStateMock.mockReturnValueOnce([[], setObj]); 
    deleteItem = jest.fn();
    useStateMock.mockReturnValueOnce([false, deleteItem]); 

    axios.get = jest.fn().mockResolvedValueOnce({ data: { token: tokenStr } });
  });

  const renderPage = () => {
    const history = createMemoryHistory();
    return render(
      <Router location={history.location} navigator={history}>
        <Cart />
      </Router>
    );
  };

  test("renders Cart component", () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue([]);
    render(<Cart />);
    const cartContainer = screen.getByTestId("cart-container");
    expect(cartContainer).toBeInTheDocument();
  });

  test("displays cart header with 'Cart' text", () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue([]);
    renderPage();
    const cartHeader = screen.getByText("Cart");
    expect(cartHeader).toBeInTheDocument();
  });

  test("displays 'Clean cart' button", () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue([data.data, []]);
    renderPage();
    const clearCartButton = screen.getByTestId("clear-cart-button");
    expect(clearCartButton).toBeInTheDocument();
  });

  test("displays 'No items in the cart' message when obj is empty", () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue([]);
    renderPage();
    const noItemsMessage = screen.getByText("No items in the cart");
    expect(noItemsMessage).toBeInTheDocument();
  });

  test("displays total price and total objects count", () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue([]);
    renderPage();
    const totalPrice = screen.getByText("Total: $");
    const totalObjects = screen.getByText("Total objects:");
    expect(totalPrice).toBeInTheDocument();
    expect(totalObjects).toBeInTheDocument();
  });

  test("displays 'Pay now' button", () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue([]);
    renderPage();
    const payNowButton = screen.getByRole("button", { name: "Pay now" });
    expect(payNowButton).toBeInTheDocument();
  });

  test("has correct CSS class for cart container", () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue([]);
    renderPage();
    const cartContainer = screen.getByTestId("cart-container");
    expect(cartContainer).toHaveClass("cart-container");
  });

  test("has correct CSS class for cart footer", () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue([]);
    renderPage();
    const cartFooter = screen.getByTestId("cart-footer");
    expect(cartFooter).toHaveClass("cart-footer");
  });
  test("fetches data on component mount", async () => {
    renderPage();
    await screen.findByText("No items in the cart"); // Почекати, поки з'явиться повідомлення "No items in the cart"
  });
});


