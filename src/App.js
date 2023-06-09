import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Products from "./pages/pagesGeneral/Products/Products";
import NotFound from "./pages/pagesGeneral/NotFound/NotFound";
import Login from "./pages/pagesGeneral/LoginRegister/Login";
import Register from "./pages/pagesGeneral/LoginRegister/Register";

import EditUser from "./pages/pagesAdmin/EditUser/EditUser";
import EditPillsTable from "./pages/pagesAdmin/EditPillsTable/EditPillsTable";
import EditPills from "./pages/pagesAdmin/EditPills/EditPills";

import Profile from "./pages/pagesUser/Profile/Profile";
import FullProducts from "./pages/pagesGeneral/FullProduct/FullProduct";
import Cart from "./pages/pagesUser/Cart/Cart"

import Main from "./pages/pagesGeneral/Main/Main";

import "./reset.scss";
import PrivateRouteUser from "./components/PrivateRoute/PrivateRouteUser";
import PrivateRouteAdmin from "./components/PrivateRoute/PrivateRouteAdmin";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route element={<PrivateRouteUser />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route element={<PrivateRouteAdmin />}>
          <Route path="/admin/edit/users" element={<EditUser />} />
          <Route path="/admin/edit/pharmacy" element={<EditPillsTable />} />
          <Route
            path="/admin/edit/pharmacy/:dosed_id"
            element={<EditPills />}
          />
        </Route>

        <Route path="/" element={<Main />} />
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
