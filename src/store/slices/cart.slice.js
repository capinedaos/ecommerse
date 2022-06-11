import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";
import { getPurcharses } from "./purchases.slice";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;

export const getCart = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
    .then((res) => dispatch(setCart(res.data.data.cart.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addToCart = (cart) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
      cart,
      getConfig()
    )
    .then(() => {
      dispatch(getCart());
      alert("se añadio el producto");
    })
    .catch((error) => console.log(error.response))
    .finally(() => dispatch(setIsLoading(false)));
};

export const checkout = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
      {},
      getConfig()
    )
    .then(() => {
      dispatch(getPurcharses());
      dispatch(setCart([]));
      alert("Checkout");
    })
    .catch((error) => console.log(error.response))
    .finally(() => dispatch(setIsLoading(false)));
};

export default cartSlice.reducer;
