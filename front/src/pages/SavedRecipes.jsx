import { useEffect, useState } from "react";
import { useGetUserID } from "../hook/useGetUserID";
import LikeButton from "../components/LikeButton";
import "./SavedRecipes.css";

export const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`/api/recipe/get-recipe/${userID}`);
        if (response.ok) {
          const data = await response.json();
          setRecipes(data.data);
          console.log(data.data);
        } else {
          console.error("Failed to fetch data.");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipes();
  }, [userID]);

  if (!userID) {
    window.location.href = "/";
    return;
  }

  const toggleLike = async (recipeId) => {
    try {
      if (likedRecipes.includes(recipeId)) {
        setLikedRecipes(likedRecipes.filter((id) => id !== recipeId));
        await fetch(`/api/recipe/update-like/${recipeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userID,
            isLiked: 0, // 0 means unliked
          }),
        });
      } else {
        setLikedRecipes([...likedRecipes, recipeId]);
        await fetch(`/api/recipe/update-like/${recipeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userID,
            isLiked: 1, // 1 means liked
          }),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="recipe-title">-My Recipes-</h1>
      <div className="recipe-grid">
        {Array.isArray(recipes) ? (
          recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <div className="card">
                <img
                  src={recipe.imageUrl}
                  className="card-img-top"
                  alt={recipe.name}
                />
                <div className="card-body">
                  <h3 className="card-title">{recipe.name}</h3>
                  <p className="card-text">{recipe.instructions}</p>
                  <p className="card-text">
                    Cooking Time: {recipe.cookingTime} mins
                  </p>
                  <LikeButton
                    className="like-button"
                    isLiked={recipe.isLiked}
                    onToggleLike={() => toggleLike(recipe._id)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading recipes...</p>
        )}
      </div>
    </div>
  );
};
