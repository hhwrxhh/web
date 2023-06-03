import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../../utils/imports";
import { useSelector, useDispatch } from "react-redux";
import {
  insertIconsArray,
  insertIcon,
  deleteIcon,
  replaceIcon,
} from "../../redux/slices/iconSLice";

import { clickFilterIcon } from "../../redux/slices/filterSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import checkUser from "../PrivateRoute/checkUser";

import styles from "./header.module.scss";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const routes = ["/products", "/admin", "/profile"];
  const [user, setUser] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);
  let icons = useSelector((state) => state.iconSlice.iconObj);
  let filter = useSelector((state) => state.filterSlice.isClickedIcon);

  let iconsArray = icons;
  const handleNavigate = (icon) => {
    if (icon === "user") {
      navigate("/profile");
    } else if (icon === "filter") {
      dispatch(clickFilterIcon());
    } else if (icon === "pills") {
      navigate("/products");
    } else if (icon === "shopping-cart") {
      navigate("/cart");
    } else if (icon === "edit") {
      navigate("/admin/edit/pharmacy");
    } else if (icon === "right-from-bracket") {
      sessionStorage.removeItem("token");
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
          setAdmin(true);
          setUser(false);
          dispatch(insertIconsArray(["users", "edit", "right-from-bracket"]));
        } else if (userType === "user") {
          setUser(true);
          setAdmin(false);
          dispatch(insertIcon("right-from-bracket"));
        }
      } catch (error) {
        // Обробка помилки
      }
    };
    setUserType();
  }, []);

  React.useEffect(() => {
    if (admin) {
      dispatch(insertIconsArray(["users", "edit", "right-from-bracket"]));
    } else {
      if (location.pathname === "/products") {
        dispatch(deleteIcon("pills"));
        dispatch(insertIcon("filter"));
      } else if (location.pathname === "/cart") {
        dispatch(replaceIcon(["filter", "pills"]));
      } else {
        dispatch(replaceIcon(["filter", "pills"]));
      }
    }
  }, [location.pathname]);
  return (
    <div className={styles.container}>
      <a href="$" className={styles.logo}>
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
                data-testid={name}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;
