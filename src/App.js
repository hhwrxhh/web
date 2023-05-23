import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// import Sidebar from "./components/Sidebar/Sidebar";

import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import FullProducts from "./pages/FullProduct";
import Cart from "./pages/Cart";

import "./scss/reset.scss";
import PrivateRouteUser from "./components/PrivateRoute/PrivateRouteUser";
import PrivateRouteAdmin from "./components/PrivateRoute/PrivateRouteAdmin";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route element={<PrivateRouteUser />}></Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<PrivateRouteAdmin />}>
          <Route path="/admin/edit/users" element={<Admin />} />
          <Route path="/admin/edit/pharmacy" element={<Admin />} />
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:dosed_id" element={<FullProducts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
