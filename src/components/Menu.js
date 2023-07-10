import React, { useState } from "react";
import Main from "./Main";
import ADM from "./ADM";

const Menu = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container">
      <h2 className="my-3">Select from dropdown:</h2>
      <div className="dropdown">
        <button
          className="dropdown-toggle btn btn-primary custom-button"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            backgroundColor: "#6f42c1",
            color: "white",
            borderRadius: "4px",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Select an option
        </button>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <button
              className="dropdown-item"
              onClick={() => handleOptionSelect("malaria-detection")}
            >
              Malaria Detection
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => handleOptionSelect("ad-malaria-detection")}
            >
             Advanced Malaria Detection
            </button>
          </li>

          // <li>
          //   <button
          //     className="dropdown-item"
          //     onClick={() => handleOptionSelect("he-to-ihc")}
          //   >
          //     HE to IHC
          //   </button>
          // </li>
          // <li>
          //   <button
          //     className="dropdown-item"
          //     onClick={() => handleOptionSelect("ihc-to-he")}
          //   >
          //     IHC to HE
          //   </button>
          // </li>
        </ul>
      </div>
      {selectedOption === "malaria-detection" && (
        <div>
          <Main />
        </div>
      )}
      {selectedOption === "ad-malaria-detection" && (
        <div>
          <ADM />
        </div>
      )}
      // {selectedOption === "he-to-ihc" && (
      //   <div>
      //     <IHCC />
      //   </div>
      // )}
      // {selectedOption === "ihc-to-he" && (
      //   <div>
      //     <HEC />
      //   </div>
      // )}
    </div>
  );
};

export default Menu;
