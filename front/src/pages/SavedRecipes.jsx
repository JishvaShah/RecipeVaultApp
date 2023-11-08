import { useEffect, useState } from "react";
import { useGetUserID } from "../hook/useGetUserID";
import LikeButton from "../components/LikeButton";
import { SearchBar } from "../components/SearchBar";
import "./SavedRecipes.css";

export const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [showLikedRecipes, setShowLikedRecipes] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (!userID) {
          window.location.href = "/";
        }
        const response = await fetch(`/api/recipe/get-recipe/${userID}`);
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

  const toggleLike = async (recipeId, isLiked) => {
    try {
      const newIsLiked = !isLiked; // Toggle the like status
      await fetch(`/api/recipe/update-like/${recipeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userID,
          isLiked: newIsLiked,
        }),
      });

      // Update the "isLiked" status locally
      const updatedRecipes = recipes.map((recipe) => {
        if (recipe._id === recipeId) {
          return { ...recipe, isLiked: newIsLiked };
        }
        return recipe;
      });
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecipe = async (recipeId) => {
    const confirmation = window.confirm(
      "Do you surely want to delete this recipe?"
    );

    if (confirmation) {
      try {
        await fetch(`/api/recipe/delete-recipe/${recipeId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userID,
          }),
        });

        // Remove the deleted recipe from the local state
        const updatedRecipes = recipes.filter(
          (recipe) => recipe._id !== recipeId
        );
        setRecipes(updatedRecipes);
        setCurrentPage(1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Function to filter recipes based on keyword
  const filteredRecipes = recipes.filter((recipe) => {
    const { category, name } = recipe;
    const lowercaseKeyword = keyword.toLowerCase();
    return (
      (category.toLowerCase().includes(lowercaseKeyword) ||
        name.toLowerCase().includes(lowercaseKeyword)) &&
      (!showLikedRecipes || recipe.isLiked)
    );
  });

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const recipesToDisplay = filteredRecipes.slice(startIndex, endIndex);

  return (
    <div>
      <h1 className="recipe-title">-My Recipes-</h1>
      <div className="container py-4 recipe-grid">
        <div className="row search-container">
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            setCurrentPage={setCurrentPage}
          />
          <div className="col-md-3 mx-auto">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="showLikedRecipes"
                checked={showLikedRecipes}
                onChange={() => {
                  setCurrentPage(1);
                  setShowLikedRecipes(!showLikedRecipes);
                }}
              />
              <label className="form-check-label" htmlFor="showLikedRecipes">
                Show Only Liked
              </label>
            </div>
          </div>
        </div>
      </div>

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
                  <h3 className="card-title">{recipe.name}</h3>
                  <p className="card-text">
                    <span className="card-text-title">Ingredients: </span>
                    <br />
                    <ul>
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </p>
                  <p className="card-text">
                    <span className="card-text-title">Instructions: </span>
                    <br />
                    {recipe.instructions}
                  </p>
                  <p className="card-text">
                    Cooking Time: {recipe.cookingTime} mins
                  </p>
                  <div className="card-footer">
                    <LikeButton
                      className="like-button"
                      isLiked={recipe.isLiked}
                      onToggleLike={() =>
                        toggleLike(recipe._id, recipe.isLiked)
                      }
                    />
                    <button
                      className="delete-button"
                      onClick={() => deleteRecipe(recipe._id)}
                    >
                      X
                    </button>
                  </div>
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
