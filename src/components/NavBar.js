import React, { useState } from "react";
import "../styles/NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const NavBar = () => {
  const logout = () => {
    localStorage.setItem("token", "");
    alert("Logout");
  };
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <nav className="nav-bar">
        <Link to="/" className="link">
          <h1>e-commerce</h1>
        </Link>

        <div>
          <Link to="/login" className="link">
            <button>
              <i className="fa-solid fa-user"></i>
            </button>
          </Link>

          <Link to="/purcharses" className="link">
            <button>
              <i className="fa-solid fa-box-archive"></i>
            </button>
          </Link>

          <button onClick={handleShow}>
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
          <button onClick={logout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      </nav>

      <Sidebar show={show} handleClose={handleClose} />
    </div>
  );
};

export default NavBar;
