import React from "react";
import axios from "axios";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { MemoryRouter } from "react-router-dom";

import { useDispatch } from "react-redux";
import configureStore from "redux-mock-store";
import { addItem } from "../../redux/slices/cartSlice";

import CartItem from "../../components/CartItem/CartItem";

jest.mock("react-redux");
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("axios");
describe("Products page logic and design", () => {
  const initialState = {
    cartSlice: {
      count: 99,
    },
  };
  const mockStore = configureStore();
  let store;
  let tokenStr =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4NTUzODkwNywianRpIjoiODU3YmQzNjItZjZkMS00NDJlLWI3ZTUtNzg3NDM0MDdkNWVjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3RfdXNlcl8xN0BnbWFpbC5jb20iLCJuYmYiOjE2ODU1Mzg5MDcsImV4cCI6MTY4NTU0MjUwN30.n5iLBNosaUcRnlCyQOBMqwsMQHt_teVB2z9R7bEyl40";

  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    store = mockStore(initialState);
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <CartItem
          fk_dosed_id={1}
          dosed_title="Test Item"
          price={10}
          dosed_count={1}
          image_url="test-image.jpg"
          testid="drug-item"
        />
      </MemoryRouter>
    );
  };
  test("dispatches addItem action and makes API request on clicking plus button", async () => {
    jest.spyOn(axios, "put").mockResolvedValueOnce({
      data: {
        fk_dosed_id: 1,
        count: 1,
      },
    });
    const { getByText } = renderComponent();

    fireEvent.click(screen.getByText("+"));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(1);
    });

    axios.put.mockRestore();
  });
  test("dispatches minusItem action and makes API request on clicking minus button", async () => {
    jest.spyOn(axios, "put").mockResolvedValueOnce({
      data: {
        fk_dosed_id: 1,
        count: 1,
      },
    });
    const { getByText } = renderComponent();

    fireEvent.click(screen.getByText("-"));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(0);
    });

    axios.put.mockRestore();
  });

  test("makes API request and updates state on clicking delete button", async () => {
    axios.delete.mockResolvedValueOnce({});

    renderComponent();
    const loginButton = screen.getByRole("button", {
      name: /delete/i,
    });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledTimes(1);
    });
  });

  test("renders product details correctly", () => {
    const item = {
      fk_dosed_id: 1,
      dosed_title: "Test Item",
      price: 10.0,
      dosed_count: 2,
      image_url: "test-image.jpg",
    };

    renderComponent();
    const image = screen.getByAltText("Product Image");
    const title = screen.getByText("Test Item");
    const price = screen.getByText("Price: 10.00");

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  test("renders quantity buttons", () => {
    const item = {
      fk_dosed_id: 1,
      dosed_title: "Test Item",
      price: 10.0,
      dosed_count: 2,
      image_url: "test-image.jpg",
    };

    renderComponent();
    const minusButton = screen.getByText("-");
    const plusButton = screen.getByText("+");

    expect(minusButton).toBeInTheDocument();
    expect(plusButton).toBeInTheDocument();
  });

  test("renders delete button", () => {
    const item = {
      fk_dosed_id: 1,
      dosed_title: "Test Item",
      price: 10.0,
      dosed_count: 2,
      image_url: "test-image.jpg",
    };
    renderComponent();
    const deleteButton = screen.getByText("Delete");

    expect(deleteButton).toBeInTheDocument();
  });

  test("displays error alert when server does not respond", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    axios.post.mockRejectedValueOnce({ response: { status: 400 } });

    renderComponent();
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(alertMock).toBeCalledTimes(0);

    alertMock.mockRestore();
  });

  test("displays error alert when server returns a 400 status", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    axios.post.mockRejectedValueOnce({ response: { status: 400 } });

    renderComponent();
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(alertMock).toHaveBeenCalledTimes(0);

    alertMock.mockRestore();
  });
  test("dispatches addItem action on clicking plus button", () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    const item = {
      fk_dosed_id: 1,
      dosed_count: 2,
    };
    renderComponent();

    fireEvent.click(screen.getByText("+"));

    expect(dispatchMock).toHaveBeenCalledWith(
      addItem({
        fk_dosed_id: item.fk_dosed_id,
      })
    );
  });
});
