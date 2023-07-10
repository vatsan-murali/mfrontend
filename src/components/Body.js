import React from "react";
import { Link } from "react-router-dom";

const Body = () => {
  return (
    <div class="container">
      <div class="px-4 pt-3 text-center">
        <h1 class="display-4 fw-bold">Early Detection Saves Lives!</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">
            Empower yourself with knowledge and take charge of your breast
            health with our innovative breast cancer detection web app. With
            just a few clicks, you can easily monitor your breast health and
            detect any abnormalities early on, giving you the best chance for
            successful treatment. Don't let fear hold you back - our app is
            designed to make breast cancer detection accessible, convenient, and
            confidential. Take the first step towards a healthier future by
            using our web app today.
          </p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <Link
              to="/menu"
              class="btn btn-primary btn-lg px-4 me-sm-3"
            >
              Continue to app
            </Link>
            <a href="/about" class="btn btn-outline-secondary btn-lg px-4">
              Read about Project
            </a>
          </div>
          <div class="overflow-hidden" style={{ maxHeight: "40vh" }}>
            <div class="container px-5">
              <div
                id="carouselExampleIndicators"
                class="carousel slide"
                data-bs-ride="true"
              >
                <div class="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    class="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="https://media.licdn.com/dms/image/C4D12AQHT2rjeGjq50g/article-cover_image-shrink_720_1280/0/1537312406291?e=2147483647&v=beta&t=KAGQFFoYRXBDqE6uT1sUjp3nU2D8fzdTbfMac_1tBCQ" alt="Sorry!" class="d-block w-100"/>
                  </div>
                  <div class="carousel-item">
                    <img src="https://www.imperial.ac.uk/media/migration/faculty-of-medicine/Homepage-Main-Image_Coombes-PNG--tojpeg_1567081670345_x2.jpg" alt="Sorry!" class="d-block w-100" />
                  </div>
                  <div class="carousel-item">
                    <img src="https://www.ucsfhealth.org/-/media/project/ucsf/ucsf-health/education/hero/biopsy-for-breast-cancer-diagnosis-surgical-breast-biopsy-2x.jpg" alt="Sorry!" class="d-block w-100"/>
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
