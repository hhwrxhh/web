import React from "react";
import { Link } from "react-router-dom";

import "./productCard.scss";

function ProductCard({ id, title, price, image }) {
  const [countProduct, setCount] = React.useState(0);
  const onClickAddButton = () => {
    setCount(countProduct + 1);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${id}`}>
        <img src={image} alt="Product Image" />
      </Link>
      <h3>{title}</h3>
      <div className="price">${price}</div>
      <Link to={`/product/${id}`}>
        <button type="button" onClick={onClickAddButton}>
          Buy Now
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;
