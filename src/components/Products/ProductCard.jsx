import React from "react";
import { Link } from "react-router-dom";

import "./productCard.scss";

function ProductCard({ id, title, price, image }) {
  return (
    <div className="product-card">
      <Link to={`/product/${id}`}>
        <img src={image} alt="Product Image" />
      </Link>
      <h3>{title}</h3>
      <div className="price">${price}</div>
      <Link to={`/product/${id}`}>
        <button type="button">Buy Now</button>
      </Link>
    </div>
  );
}

export default ProductCard;
