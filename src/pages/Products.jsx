import React from "react";
import axios from "axios";
import "../scss/products.scss";

import { useSelector, useDispatch } from "react-redux";
import { clickFilterIcon, setSubmitClicked } from "../redux/slices/filterSlice";

import ProductCard from "../components/Products/ProductCard";
// import Sidebar from "../components/Sidebar/Sidebar";

const Products = () => {
  const [items, setItems] = React.useState([]);
  const dispatch = useDispatch();
  let urlParams = useSelector((state) => state.filterSlice.filterParams);
  let clicked = useSelector((state) => state.filterSlice.isClickedSubmit);

  const url = "http://127.0.0.1:5000/";

  React.useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/drug/dosed", {
        params: urlParams,
      })
      .then((response) => {
        const arr = response.data;
        for (let j = 0; j < arr.length; j++) {
          const path = arr[j].image_path;
          arr[j].image_path = url + path;
        }
        setItems(arr);
      })
      .catch((error) => {
        // console.log(error);
      });
    dispatch(setSubmitClicked(false));
  }, [clicked]);

  return (
    <div>
      <div className="product-container" data-testid="products">
        {items.map((obj) => (
          <ProductCard
            key={obj.dosed_id}
            id={obj.dosed_id}
            title={obj.dosed_name}
            price={obj.dosed_price}
            image={obj.image_path}
            testid="drug-item"
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
