import React from "react";
import axios from "axios";
import "@testing-library/jest-dom";

import checkUser from "../components/PrivateRoute/checkUser";

jest.mock("axios");

describe("checkUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 'user' when user role is 'User'", async () => {
    axios.get.mockResolvedValueOnce({ data: { Success: "User" } });
    const result = await checkUser("token");
    expect(result).toBe("user");
    expect(axios.get).toBeCalledWith("http://127.0.0.1:5000/user/role", {
      headers: { Authorization: "Bearer token" },
    });
  });

  it("should return 'admin' when user role is 'Admin'", async () => {
    axios.get.mockResolvedValueOnce({ data: { Success: "Admin" } });
    const result = await checkUser("token");
    expect(result).toBe("admin");
    expect(axios.get).toBeCalledWith("http://127.0.0.1:5000/user/role", {
      headers: { Authorization: "Bearer token" },
    });
  });

  it("should throw an error when user role is unknown", async () => {
    axios.get.mockResolvedValueOnce({ data: { Success: "Unknown" } });
    await expect(checkUser("token")).rejects.toThrow("Unknown user type");
    expect(axios.get).toBeCalledWith("http://127.0.0.1:5000/user/role", {
      headers: { Authorization: "Bearer token" },
    });
  });

  it("should return null when token is null", async () => {
    const result = await checkUser(null);
    expect(result).toBeNull();
    expect(axios.get).not.toBeCalled();
  });
});
