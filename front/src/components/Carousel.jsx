import "./Carousel.css";

export const Carousel = () => {
  return (
    <>
      <div className="container" style={{ maxWidth: "100%" }}>
        <div className="row">
          <div className="image-container">
            <img
              src="https://cdn.wallpapersafari.com/1/5/zrIGxJ.jpg"
              alt="Your Image"
              className="img-fluid"
            />
            <div className="overlay-text">
              <h1 className="headingStyle">Recipe Vault</h1>
              <p className="home-paragraph-text">
                Recipe Vault is a culinary project aimed at assisting users in
                curating
                <br /> and managing their favorite recipes. Our app simplifies
                saving, creating, and organizing recipes, improving your cooking
                experience.
                <br /> Start by creating and saving amazing recipes today!{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
