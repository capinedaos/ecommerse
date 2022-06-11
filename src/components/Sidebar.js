import React, { useEffect } from "react";
import { ListGroup, Offcanvas } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { checkout, getCart } from "../store/slices/cart.slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({ show, handleClose }) => {
  const cartProducts = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="fluid" />
          {cartProducts.map((product) => (
            <ListGroup.Item key={product.id}>
              <div
                className="item-cart"
                onClick={() => navigate(`/products/${product?.id}`)}
              >
                <p>{product.title}</p>
                <p>Total: ${product.price}</p>
                <p>Quantity: {product.productsInCart.quantity}</p>
                <button>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </ListGroup.Item>
          ))}
          <ListGroup />
          <div className="container-checkout">
            <p>Total</p>
            <button onClick={() => dispatch(checkout())}>Checkout</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Sidebar;
