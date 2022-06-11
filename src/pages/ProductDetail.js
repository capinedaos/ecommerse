import axios from "axios";
import React, { useEffect, useState } from "react";
import Target from "../components/Target";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { filterCategory } from "../store/slices/products.slice";
import "../styles/ProductDetail.css";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { addToCart } from "../store/slices/cart.slice";
SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

const ProductDetail = () => {
  const [products, setProducts] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);

  useEffect(() => {
    axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/")
      .then((res) => {
        const productSearch = res.data.data.products.find(
          (productsItem) => productsItem.id === Number(id)
        );
        setProducts(productSearch);
        dispatch(filterCategory(productSearch.category.id));
      });
  }, [dispatch, id]);

  const addCart = () => {
    const cart = {
      id,
      quantity,
    };
    dispatch(addToCart(cart));

    console.log(cart);
  };

  return (
    <div>
      <div className="container-detail">
        <div className="product-detail">
          <h2>{products.title}</h2>
          <p className="description" >{products.description}</p>

          <div className="item-price">
            <p>
              Price: <span>${products.price}</span>
            </p>

            <div className="container-quantity">
              <p>Quantity</p>
              <div className="quantity">
                <button
                  onClick={() => {
                    setQuantity(quantity - 1);
                  }}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button className="add-cart" onClick={addCart}>
            Add to cart <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>

        <Swiper
          style={{
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#000",
          }}
          modules={[Navigation, Pagination, EffectCoverflow]}
          spaceBetween={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className="swiper-slide"
          navigation={true}
          effect={"coverflow"}
          centeredSlides={true}
          slidesPerView={window.innerWidth < 768 ? 1 : 3}
          loop={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {productsList.map((imgproduct) => (
            <SwiperSlide key={imgproduct.id}>
              <img src={imgproduct.productImgs} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="similar-items">
        <h2>Discover similar items</h2>
        <ul className="ul-targets">
          {productsList.map((productsItem) => (
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
    </div>
  );
};

export default ProductDetail;
