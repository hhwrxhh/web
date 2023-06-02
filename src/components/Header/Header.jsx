import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../utils/imports";

import { useSelector, useDispatch } from "react-redux";
import {
  insertIconsArray,
  insertIcon,
  deleteIcon,
  replaceIcon,
} from "../../redux/slices/iconSLice";
import { clickFilterIcon } from "../../redux/slices/filterSlice";

import checkUser from "../PrivateRoute/checkUser";
import styles from "./header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  let icons = useSelector((state) => state.iconSlice.iconObj);

  let iconsArray = icons;
  const handleNavigate = (icon) => {
    if (icon === "user-check") {
      navigate("/profile");
    } else if (icon === "filter") {
      dispatch(clickFilterIcon());
      return;
    } else if (icon === "pills") {
      navigate("/products");
    } else if (icon === "shopping-cart") {
      navigate("/cart");
    } else if (icon === "edit") {
      navigate("/admin/edit/pharmacy");
    } else if (icon === "right-from-bracket") {
      sessionStorage.removeItem("token");
      dispatch(insertIconsArray(["user", "shopping-cart", "pills"]));
      navigate("/login");
      dispatch(deleteIcon("right-from-bracket"));
    } else if (icon === "users") {
      navigate("/admin/edit/users");
    }
  };

  React.useEffect(() => {
    const setUserType = async () => {
      dispatch(insertIconsArray(["user", "shopping-cart", "pills"]));
      try {
        const tokenStr = sessionStorage.getItem("token");
        const userType = await checkUser(tokenStr);
        if (userType === "admin") {
          dispatch(insertIconsArray(["users", "edit", "right-from-bracket"]));
        } else if (userType === "user") {
          dispatch(insertIcon("right-from-bracket"));
          dispatch(replaceIcon(["user", "user-check"]))
        }
      } catch (error) {
        // Обробка помилки
      }
    };
    setUserType();
  }, [location.pathname]);

  React.useEffect(() => {
    if (location.pathname === "/products") {
      dispatch(deleteIcon("pills"));
      dispatch(insertIcon("filter"));
    } else if (location.pathname === "/cart") {
      dispatch(replaceIcon(["filter", "pills"]));
    } else {
      dispatch(replaceIcon(["filter", "pills"]));
    }
  }, [location.pathname]);
  return (
    <div className={styles.container}>
      <a href="/" className={styles.logo}>
        Pharmacy
      </a>
      <div className={styles.search}>
        <FontAwesomeIcon icon="fa-search" className={styles.icon} />
        <input type="text" name="" placeholder="Search" />
      </div>
      <ul className={styles.nav}>
        {iconsArray.map((name, index) => (
          <li key={index}>
            <a href="#">
              <FontAwesomeIcon
                icon={name}
                onClick={() => handleNavigate(name)}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
