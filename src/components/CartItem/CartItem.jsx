import React from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { addItem, minusItem } from "../../redux/slices/cartSlice";

const CartItem = ({
  fk_dosed_id,
  dosed_title,
  price,
  dosed_count,
  image_url,
}) => {
  const dispatch = useDispatch();
  const tokenStr = sessionStorage.getItem("token");
  const [deleteItem, setDeleteItem] = React.useState(false);

  const onClickPlus = () => {
    dispatch(
      addItem({
        fk_dosed_id,
      })
    );

    try {
      axios.put(
        "http://127.0.0.1:5000/cart",
        {
          fk_dosed_id,
          count: dosed_count + 1,
        },
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      );
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
        return;
      }
      if (err.response?.status === 400) {
        alert("Some fields are empty");
      }
    }
  };

  const onClickMinus = () => {
    dispatch(
      minusItem({
        fk_dosed_id,
      })
    );

    if (dosed_count > 1) {
      try {
        axios.put(
          "http://127.0.0.1:5000/cart",
          {
            fk_dosed_id,
            count: dosed_count - 1,
          },
          {
            headers: { Authorization: `Bearer ${tokenStr}` },
          }
        );
      } catch (err) {
        if (!err?.response) {
          alert("No Server Response");
          return;
        }
      }
    }
  };

  const onClickDelete = () => {
    try {
      axios.delete("http://127.0.0.1:5000/cart", {
        headers: { Authorization: `Bearer ${tokenStr}` },
        data: {
          fk_dosed_id,
        },
      });
      setDeleteItem(true);
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
        return;
      }
      setDeleteItem(false);
      dispatch(
        removeItem({
          fk_dosed_id,
        })
      );
    }
  };

  if (deleteItem) {
    return null; 
  }

  return (
    <div className="cart-item">
      <img src={image_url} alt="Product Image" />
      <div className="cart-item-details">
        <h3>{dosed_title}</h3>
        <p>Price: {(price * dosed_count).toFixed(2)}</p>
        <div className="cart-item-quantity">
          <button onClick={onClickMinus} className="quantity-minus">
            -
          </button>
          <input type="text" value={dosed_count} readOnly />
          <button onClick={onClickPlus} className="quantity-plus">
            +
          </button>
        </div>
        <button onClick={onClickDelete} className="cart-item-remove">
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;
