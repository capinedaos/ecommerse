import React from "react";
import { useNavigate } from "react-router-dom";

const Target = ({ productsItemId, route, img, title, price, addCart }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate(route.toString())}
      key={productsItemId}
    >
      <img src={img.toString()} alt="" />
      <div className="description-card">
        <h2>{title}</h2>
        <div className="price">
          <div className="item-price">
            <p>Price: $</p>
            <span> {price}</span>
          </div>
          <div>
            <button onClick={() => addCart(productsItemId)}>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Target;
