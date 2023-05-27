import React from "react";
import axios from "axios";

import "./Sidebar.scss";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "../Dropdown/Dropdown";

import { useSelector, useDispatch } from "react-redux";
import {
  clickFilterIcon,
  setSubmitClicked,
} from "../../redux/slices/filterSlice";
const options = [1, 2, 3];
let obj = [];

function Sidebar() {
  const dispatch = useDispatch();
  const sideBarRef = React.useRef(null);
  let filter = useSelector((state) => state.filterSlice.isClickedIcon);
  let filterParams = useSelector((state) => state.filterSlice.isClickedSubmit);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const tmpArray = [];
      axios
        .get("http://127.0.0.1:5000/category")
        .then((response) => {
          const arr = response.data;
          for (let i = 0; i < arr.length; i++) {
            tmpArray.push(arr[i].category_name);
          }
        })
        .catch((error) => {
          console.log("Error fetching categories:", error);
        });

      const objCategory = { title: "Category", title_sub: tmpArray };
      obj.push(objCategory);
      return obj;
    };

    const fetchSubCategories = async () => {
      const tmpArray = [];
      fetch("http://127.0.0.1:5000/category/1/subcategory", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((arr) => {
          for (let i = 0; i < arr.length; i++) {
            tmpArray.push(arr[i].sub_category_name);
          }
        });
      const objSubCategory = { title: "SubCategory", title_sub: tmpArray };
      obj.push(objSubCategory);
      return obj;
    };

    const fetchBoth = async () => {
      const cate = await fetchCategories();
      const SubCAtegory = await fetchSubCategories();
      const objPice = { title: "Price", title_sub: ["ASC", "DESC"] };
      const objPrescription = {
        title: "Prescription",
        title_sub: ["YES", "NO"],
      };
      obj.push(objPice, objPrescription);
    };

    fetchBoth();
    return () => {
      obj = [];
    };
  }, []);

  const handleSubmit = () => {
    dispatch(setSubmitClicked(true));
    dispatch(clickFilterIcon(false));
  };
  return (
    <div className={filter ? "menu active" : "menu"}>
      <div className="menu__content">
        {obj.map((item, index) => (
          <Dropdown
            key={index}
            selected={item.title}
            options={item.title_sub}
          />
        ))}
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
