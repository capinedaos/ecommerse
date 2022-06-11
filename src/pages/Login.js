import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/users/login",
        data
      )
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        navigate("/");
        alert("Sesión iniciada correctamente");
      })
      .catch((error) => {
        // console.log(error.response.status);
        if (error.response.status === 404) {
          alert("Credenciales incorrectas");
        }
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(submit)}>
        <h2>Welcome! Enter your email and password to continue</h2>
        <div className="text-data">
          <h3>Test data</h3>
          <div className="date-login">
            <span>
              <i className="fa-solid fa-envelope">
                <p>mason@gmail.com</p>
              </i>
            </span>
            <span>
              <i className="fa-solid fa-lock">
                <p>mason1234</p>
              </i>
            </span>
          </div>
        </div>

        <div className="container-input">
          <div className="input">
            <label htmlFor="email-input">Email</label>
            <input type="email" id="email-input" {...register("email")} />
          </div>
          <div className="input">
            <label htmlFor="password-input">Password</label>
            <input
              type="password"
              id="password-input"
              {...register("password")}
            />
          </div>
          <button type="submit">Login</button>
          <p>Don't have an account? Sign up</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
