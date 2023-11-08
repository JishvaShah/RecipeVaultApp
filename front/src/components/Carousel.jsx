import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Carousel.css";

export const Carousel = () => {
  const [cookies] = useCookies(["access_token"]);
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
                <br />
                <span>
                  <Link
                    to={cookies.access_token ? "/create-recipe" : "/login"}
                    style={{ textDecoration: "none", color: "blueviolet" }}
                  >
                    Create an amazing recipe today!
                  </Link>
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
