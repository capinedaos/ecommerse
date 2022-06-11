import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home, Login, ProductDetail, Purcharses } from "./pages";
import { LoadingScreen, NavBar, ProtectedRoutes } from "./components";
import { useSelector } from "react-redux";
import "swiper/css/bundle";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      <div className="App">
        <NavBar />
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/purcharses" element={<Purcharses />} />
          </Route>
        </Routes>
        <footer>
          <p>© Academlo 2022</p>
          <div className="icons">
            <a href="https://www.instagram.com/">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://www.youtube.com/">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
