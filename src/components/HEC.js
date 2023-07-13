import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HEC = () => {
  let navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const mainPage = async () => {
    try {
      const token = localStorage.getItem("jwtoken");
      console.log('TOKEN IN MAIN PAGE FRONTEND',token)
      if(!token){
        navigate('/login')
      }
      const res = await fetch("https://malaria-backend.onrender.com/site", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
//         credentials: "include",
      });

      const data = await res.json();

      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (e) {
      console.log(e);
      navigate("/login");
    }
  };
  useEffect(() => {
    mainPage();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setProcessedImage(null); 
  };

  const handleGenerateClick = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      axios
        .post("https://999e-44-203-157-24.ngrok-free.app/ihc_patch", formData)
        .then((response) => {
          console.log(response.data);
          setProcessedImage(response.data.image); 
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="my-3" style={{ fontFamily: "Arial, sans-serif" }}>
            Select HE Image:
          </h1>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={handleImageChange}
          />
          <button
            onClick={handleGenerateClick}
            className="my-4 btn btn-primary"
          >
            Submit
          </button>
        </div>
      </div>
      
      <div className="row justify-content-center">
        <div className="col-md-6">
          {selectedImage && (
            <div className="image-container">
              <h3>Original Image:</h3>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Image"
                className="image"
              />
            </div>
          )}
        </div>
        <div className="col-md-6">
          {processedImage && (
            <div className="image-container">
              <h3>Processed Image:</h3>
              <img
                src={`data:image/png;base64,${processedImage}`}
                alt="Processed Image"
                className="image"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HEC;
