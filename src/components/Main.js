import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Main = () => {
  let textStyle;

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [choice, setChoice] = useState("");

  const handleRadioChange = async (event) => {
    const selectedChoice = event.target.value;
    setChoice(selectedChoice);
    const token = localStorage.getItem("jwtoken");
    if (selectedChoice !== "") {
      try {
        const res = await fetch("https://malaria-backend.onrender.com/send-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            imagePreviewUrl,
            prediction,
            choice: selectedChoice,
          }),
        });
        const data = await res.json();
        if (res.status === 422) {
          console.log(data.error);
        } else {
          console.log(data.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
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

  const handleFileChange = (e) => {
    const reader = new FileReader();
    const selectedFile = e.target.files[0];

    reader.onloadend = () => {
      setFile(selectedFile);
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("File could not be found!");
    } else {
      setError("");

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post("https://999e-44-203-157-24.ngrok-free.app/predict", formData, {
        });

        setPrediction(response.data.prediction);
        setChoice("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   // const formData = new FormData();
  //   console.log(file);

  //   if (!file) {
  //     setError("File could not be found!");
  //   } else {
  //     setError("");
  //     // formData.append("image", file);
  //     // console.log(file,formData.image)
  //     console.log(imagePreviewUrl);
  //     // const response = await fetch("/predict",{
  //     //   method: "POST",
  //     //   headers: {'Content-Type': 'text/plain'},
  //     //   body: imagePreviewUrl});
  //     // const base64Data = imagePreviewUrl.replace(
  //     //   /^data:image\/\w+;base64,/,
  //     //   ""
  //     // );
  //     // const buffer = Buffer.from(base64Data, "base64");
  //     const base64Data = imagePreviewUrl.replace(
  //       /^data:image\/\w+;base64,/,
  //       ""
  //     );
  //     const binaryString = atob(base64Data);
  //     const buffer = new Uint8Array(binaryString.length);
  //     for (let i = 0; i < binaryString.length; i++) {
  //       buffer[i] = binaryString.charCodeAt(i);
  //     }
  //     const { data } = await axios.post("/predict", { image: buffer });
  //     // const data = await response.json();
  //     setPrediction(data.prediction);
  //     setChoice("");
  //   }
  // };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="my-3">Malaria Classifier</h1>
          <label for="formFile" class="form-label">
            Upload image :
          </label>
          <input
            class="form-control"
            type="file"
            id="formFile"
            onChange={handleFileChange}
          />
          {error && <div className="text-danger">{error}</div>}
          <br></br>
          {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" />}
          <br></br>
          <button onClick={handleFormSubmit} className="my-4 btn btn-primary">
            Submit
          </button>

          {prediction ? (
            <>
              <div>
                <h3>
                  Prediction:&nbsp;
                  {prediction.startsWith("P") ? (
                    <span className="text-danger">Parasitized</span>
                  ) : (
                    <span className="text-success">Uninfected</span>
                  )}
                </h3>
                <h5>Is the prediction accurate?</h5>

                <input
                  type="radio"
                  name="choice"
                  value="Yes"
                  checked={choice === "Yes"}
                  onChange={handleRadioChange}
                />
                <label>&nbsp;Yes</label>
                <br></br>
                <input
                  type="radio"
                  name="choice"
                  value="No"
                  checked={choice === "No"}
                  onChange={handleRadioChange}
                />
                <label>&nbsp;No</label>
                <br></br>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
