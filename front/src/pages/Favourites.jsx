import { useEffect, useState } from "react";
import { useGetUserID } from "../hook/useGetUserID";
import "./SavedRecipes.css";

export const Favourites = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (!userID) {
          window.location.href = "/";
        }
        const response = await fetch(`/api/recipe/get-recent-recipes/${userID}`);
        if (response.ok) {
          const data = await response.json();
          setRecipes(data.data);
        } else {
          console.error("Failed to fetch data.");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipes();
  }, [userID]);

  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const recipesToDisplay = recipes.slice(startIndex, endIndex);

  return (
    <div>
      <h1 className="recipe-title">- Your favorite recipes -</h1>
      
      <div className="recipe-grid">
        {recipesToDisplay.length > 0 ? (
          recipesToDisplay.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <div className="card">
                <div className="card-img-container">
                  <img
                    src={recipe.imageUrl}
                    className="card-img-top"
                    alt={recipe.name}
                  />
                </div>
                <div className="card-body">
                  <h2 className="card-title">{recipe.name}</h2>

                  <p className="card-text">
                    <span className="card-text-title">Instructions: </span>
                    <br />
                    {recipe.instructions}
                  </p>

                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found. Create a new recipe today!</p>
        )}
      </div>
      {/* Pagination controls */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
