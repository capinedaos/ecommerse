import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurcharses } from "../store/slices/purchases.slice";
import "../styles/Purcharses.css";

const Purcharses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurcharses());
  }, [dispatch]);

  return (
    <div>
      <h1>My purchases</h1>
      <ul>
        {purchases.map((purchase) => (
          <li key={purchase.id} className="purchase">
            <h4>{purchase.createdAt}</h4>
            {purchase.cart.products.map((product) => (
              <div
                className="product"
                onClick={() => navigate(`/products/${product.id}`)}
                key={product.id}
              >
                <p>{product.title}</p>
                <p>Quanty: ${product.quantity}</p>
                <p>Items: {product.productsInCart.quantity}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Purcharses;
