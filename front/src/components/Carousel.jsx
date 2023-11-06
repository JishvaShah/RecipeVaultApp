import "./Carousel.css";

export const Carousel = () => {
  return (
    <>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://hips.hearstapps.com/del.h-cdn.co/assets/15/39/2560x1280/landscape-1443212749-gettyimages-73042755.jpg?resize=1200:*"
              className="d-block w-100 img-fluid maxH"
              alt="Picture of Bread"
            />
            <div className="carousel-caption d-none d-md-block">
              <h1 className="headingStyle">Welcome to Recipe Vault!</h1>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://assets-eu-01.kc-usercontent.com/559bb7d3-88a4-01c1-79a3-dd4d5b2d2bb0/760d10cf-7037-481e-9f6a-5b8d6a408ef1/Biscoff%20Cupcakes%201_landscape.jpg"
              className="d-block w-100 maxH"
              alt="Cupcakes"
            />
            <div className="carousel-caption d-none d-md-block">
              <h1 className="headingStyle">Create your own Recipes</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
