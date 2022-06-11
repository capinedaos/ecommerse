import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Target from "../components/Target";
import {
  filterCategory,
  filterProduct,
  getProducts,
} from "../store/slices/products.slice";
import axios from "axios";
import { addToCart } from "../store/slices/cart.slice";
import "../styles/Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, [dispatch]);

  const filterProductHome = () => {
    dispatch(filterProduct(search));
  };

  const selectCategory = (id) => {
    dispatch(filterCategory(id));
  };

  const addCart = (id) => {
    const product = {
      id: id,
      quantity: 1,
    };
    dispatch(addToCart(product));
  };

  return (
    <div className="content-home">
      <form className="home-form" action="">
        <input
          className="form-input"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="form-btn" onClick={filterProductHome}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      <h3>Category</h3>
      <ul className="ul-categories">
        {categories.map((category) => (
          <li key={category.id} onClick={() => selectCategory(category.id)}>
            {category.name}
          </li>
        ))}
      </ul>

      <ul className="ul-targets">
        {products.map((productsItem) => (
          <Target
            key={productsItem?.id}
            productsItemId={productsItem?.id}
            route={`/products/${productsItem?.id}`}
            img={productsItem.productImgs?.[0]}
            title={productsItem.title}
            price={productsItem.price}
            addCart={addCart}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
