import React, { useState } from "react";
import axios from "axios";

const ADM = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

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
        .post("https://232a-34-230-74-206.ngrok-free.app/he_patch", formData)
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
            Select IHC Image:
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

export default ADM;
