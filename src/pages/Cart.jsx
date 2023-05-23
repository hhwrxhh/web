import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem/CartItem";
import "../scss/Cart.scss";
import { clearItems } from "../redux/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const previousItems = React.useRef([]);
  const { totalPrice, items } = useSelector((state) => state.cartSlice);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const onClickClear = () => {
    dispatch(clearItems());
  };

  React.useEffect(() => {
    function delete_data() {
      const tokenStr = sessionStorage.getItem("token");
      axios
        .delete("http://127.0.0.1:5000/cart", {
          headers: { Authorization: `Bearer ${tokenStr}` },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    function add_data() {
      const tokenStr = sessionStorage.getItem("token");
      axios
        .post("http://127.0.0.1:5000/cart", {
          headers: { Authorization: `Bearer ${tokenStr}` },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (previousItems.current !== items) {
      console.log("Дані змінилися!", items);

      delete_data();
    }

    previousItems.current = items;
  }, [items]);
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Cart</h2>
        <button onClick={onClickClear} className="cart-clear">
          Clean cart
        </button>
      </div>
      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className="cart-footer">
        <p>Total: ${totalPrice}</p>
        <p>Total objects: {totalCount}</p>
        <button className="buy-btn size">Pay now</button>
      </div>
    </div>
  );
}
export default Cart;
