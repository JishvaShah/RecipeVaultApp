import { Carousel } from "../components/Carousel";

// import { RecipeGallery } from "../components/RecipeGallery";

export const Home = () => {
  return (
    <div className="mt-4 ms-4 me-4">
      <Carousel />
      <div className="d-flex justify-content-center">
        {/* <h1 className="text-center mt-4">My Recipes!</h1> */}
      </div>
      {/* <RecipeGallery /> */}
    </div>
  );
};
