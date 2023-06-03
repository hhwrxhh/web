import React from "react";
import axios from "axios";

import { render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";

import { MemoryRouter, Router, BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Products from "../../pages/Products";
import { data } from "../../test_data/drug_data";

jest.mock("axios");

describe("Products page logic and design", () => {
  const initialState = {
    filterSlice: {
      isClickedIcon: false,
      filterParams: {
        Category: "",
        SubCategory: "",
        Price: "",
        Prescription: "",
      },
      isClickedSubmit: false,
    },
  };

  let store;
  let resp;

  const mockStore = configureStore();
  const renderPage = () => {
    const history = createMemoryHistory();
    return render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Products />
        </Router>
      </Provider>
    );
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test("Everything is working with data", () => {
    axios.get.mockResolvedValue({ data });
    React.useState = jest.fn().mockReturnValue([data.data, []]);
    renderPage();
    expect(axios.get).toBeCalledTimes(1);
  });
  test("Get data from server", async () => {
    axios.get.mockResolvedValue({ data });
    React.useState = jest.fn().mockReturnValue([data.data, []]);
    renderPage();
    const productCards = screen.getAllByTestId("drug-item");
    expect(productCards.length).toBe(7); 
    expect(axios.get).toBeCalledTimes(1);
  });
});
