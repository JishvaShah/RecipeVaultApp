import "./Carousel.css";

export const Carousel = () => {
  return (
    <>
      <div className="container" style={{ maxWidth: "100%" }}>
        <div className="row">
          <div className="image-container">
            <img
              src="https://massel.com/wp-content/uploads/2021/07/Vault_Hero.jpg"
              alt="Your Image"
              className="img-fluid"
            />
            <div className="overlay-text">
              <h1 className="headingStyle">Recipe Vault</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
