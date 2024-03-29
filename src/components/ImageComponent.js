import { useEffect, useState } from "react";

function ImageComponent() {
  const [imageSrc, setImageSrc] = useState([]);
  const token = localStorage.getItem('jwtoken')
  useEffect(() => {
    
    const getImage = async () => {
      try {
        const res = await fetch("https://malaria-backend.onrender.com/get-images", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
        const data = await res.json();

        if (res.status === 500) {
          console.log(data.error);
        } else {
          setImageSrc(data.images);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getImage();
  }, []);

  return (
    <div className="container mt-2">
      <div className="row">
        {imageSrc.map((image) => (
          <div className="col-md-4 mb-3" key={image._id}>
            <div className="card h-100">
              <img
                src={image.image}
                alt="Image"
                className="card-img-top"
                style={{ height: "200px" }}
              />
              <div className="card-body">
                <h5 className="card-title">Predicted value: {image.predicted}</h5>
                <p className="card-text">Ground Truth: {image.actual}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default ImageComponent;
