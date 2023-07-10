import React, { useState } from "react";
import axios from "axios";

const ADM = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [classCounts, setClassCounts] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setProcessedImage(null); // Reset the processed image when a new image is selected
    setClassCounts(null); // Reset the class counts when a new image is selected
  };

  const handleGenerateClick = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      axios
        .post("http://localhost:5000/advm", formData)
        .then((response) => {
          // Handle the response from Flask
          console.log(response.data);
          setProcessedImage(response.data.image); // Set the processed image received from Flask
          setClassCounts({
            trophozoite: response.data.trophozoite,
            ring: response.data.ring,
            schizont: response.data.schizont,
            gametocyte: response.data.gametocyte,
            all: response.data.all,
          }); // Set the class counts received from Flask
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="my-3" style={{ fontFamily: "Arial, sans-serif" }}>
            Select Malaria Image:
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

      {/* Display the images side by side */}
      
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

export default ADM;
