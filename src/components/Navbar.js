import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  console.log(state);
  const RenderNavbar = () => {
    if (state) {
      return (
        <div className="container">
          <nav class="navbar navbar-expand-lg navbar-light border-bottom p-0">
            <div class="container-fluid ">
              <Link to="/" className="navbar-brand mt-1">
                <p className="fw-bold mb-0 fs-4">CancerCare</p>
                <p className="fw-semibold" style={{ fontSize: "0.5rem" }}>
                  Breast Cancer Detective Assistant
                </p>
              </Link>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                    <Link class="nav-link px-3 py-2 me-3" to="/view">
                      View Past Predictions
                    </Link>
                  </li>
                  <li>
                    <Link class="nav-link px-3 py-2 " to="/logout">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    } else {
      return (
        <div className="container">
          <nav class="navbar navbar-expand-lg navbar-light border-bottom p-0">
            <div class="container-fluid ">
              <Link to="/" className="navbar-brand mt-1">
                <p className="fw-bold mb-0 fs-4">CancerCare</p>
                <p className="fw-semibold" style={{ fontSize: "0.5rem" }}>
                  Breast Cancer Detective Assistant
                </p>
              </Link>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                    <Link class="nav-link  px-3 py-2 me-2" to="/login">
                      Login
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link px-3 py-2 " to="/signup">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    }
  };
  return (
    <>
      <RenderNavbar />
    </>
  );
};

export default Navbar;
