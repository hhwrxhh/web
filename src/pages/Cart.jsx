import React from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import CartItem from "../components/CartItem/CartItem";
import "../scss/Cart.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const [obj, setObj] = React.useState([]);
  const [renderMap, setRenderMap] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const tokenStr = sessionStorage.getItem("token");

  let items = useSelector((state) => state.cartSlice.count);
  function getData() {
    const url = "http://127.0.0.1:5000/";
    axios
      .get("http://127.0.0.1:5000/cart", {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then((response) => {
        const arr = response.data;
        for (let j = 0; j < arr.length; j++) {
          const path = arr[j].image_url;
          arr[j].image_url = url + path;
        }
        setObj(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    getData();
  }, [items]);

  const onClickClear = () => {
    axios
      .delete("http://127.0.0.1:5000/cart/clear", {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then((response) => {
        setObj([]);
        setTotalCount(0);
        setTotalPrice(0);
        items = 0;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    if (obj && Array.isArray(obj)) {
      setTotalCount(obj.reduce((sum, item) => sum + item.dosed_count, 0));
      setTotalPrice(
        obj
          .reduce((sum, obj) => {
            return obj.price * obj.dosed_count + sum;
          }, 0)
          .toFixed(2)
      );
      setRenderMap(true);
    } else if (obj.length === 0) {
      setObj([]);
      setTotalCount(0);
      setTotalPrice(0);
      setRenderMap(false);
    } else {
    }
  }, [obj, items]);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Cart</h2>
        <button onClick={onClickClear} className="cart-clear">
          Clean cart
        </button>
      </div>
      {renderMap && obj && Array.isArray(obj) && obj.length > 0 ? (
        <div className="cart-items">
          {obj.map((item) => (
            <CartItem key={item.dosed_id} {...item} testid="cart-item" />
          ))}
        </div>
      ) : (
        <h1>No items in the cart</h1>
      )}
      <div className="cart-footer">
        <p>Total: ${totalPrice}</p>
        <p>Total objects: {totalCount}</p>
        <button
          onClick={() => {
            onClickClear();
            alert("Success");
          }}
          className="buy-btn size"
        >
          Pay now
        </button>
      </div>
    </div>
  );
};
export default Cart;
