import React from "react";
import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../../redux/slices/cartSlice";

const CartItem = ({ id, title, price, count, image }) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      })
    );
  };

  const onClickMinus = () => {
    dispatch(
      minusItem({
        id,
      })
    );
  };

  const onClickDelete = () => {
    dispatch(removeItem(id));
  };
  return (
    <div className="cart-item">
      <img src={image} alt="Product Image" />
      <div className="cart-item-details">
        <h3>{title}</h3>
        <p>Price: {(price * count).toFixed(2)}</p>
        <div className="cart-item-quantity">
          <button onClick={onClickMinus} className="quantity-minus">
            -
          </button>
          <input type="text" value={count} readOnly />
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
