import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem/CartItem";
import "../scss/Cart.scss";
import { clearItems } from "../redux/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const [obj, setObj] = React.useState([]);
  const [renderMap, setRenderMap] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const tokenStr = sessionStorage.getItem("token");

  React.useEffect(() => {
    function deleteData() {
      axios
        .delete("http://127.0.0.1:5000/cart/clear", {
          headers: { Authorization: `Bearer ${tokenStr}` },
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function getData() {
      axios
        .get("http://127.0.0.1:5000/cart", {
          headers: { Authorization: `Bearer ${tokenStr}` },
        })
        .then((response) => {
          setObj(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getData();
  }, [obj]);

  const onClickClear = () => {
    axios
      .delete("http://127.0.0.1:5000/cart/clear", {
        headers: { Authorization: `Bearer ${tokenStr}` },
      })
      .then((response) => {
        setObj([]);
      })
      .catch((error) => {
        console.log(error);
      });
    setTotalCount(0);
    setTotalPrice(0);
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
    } else {
      setRenderMap(false);
    }
  }, [obj]);

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
            <CartItem key={item.dosed_id} {...item} />
          ))}
        </div>
      ) : (
        <h1>No items in the cart</h1>
      )}
      <div className="cart-footer">
        <p>Total: ${totalPrice}</p>
        <p>Total objects: {totalCount}</p>
        <button className="buy-btn size">Pay now</button>
      </div>
    </div>
  );
}
export default Cart;
