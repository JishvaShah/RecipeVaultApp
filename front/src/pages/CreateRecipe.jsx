import { useState } from "react";
import { useGetUserID } from "../hook/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import "./CreateRecipe.css";

export const CreateRecipes = () => {
  const userID = useGetUserID();
  const [cookies] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    category: "",
    cookingTime: null,
    isliked: false,
    userOwner: userID,
  });
  const navigate = useNavigate();

  if (!userID) {
    window.location.href = "/";
    return;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleDeleteIngredient = (index) => {
    const ingredients = [...recipe.ingredients];
    ingredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/recipe/create-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.access_token}`,
        },
        body: JSON.stringify(recipe),
      });

      if (response.ok) {
        toast.success("Recipe created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/saved-recipes");
      } else {
        // Handle error response
        console.error("Recipe creation failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="recipe row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">-Create Recipe-</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={recipe.name}
                onChange={handleChange}
                autoFocus
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label">
                Ingredients
              </label>
              <br />
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="d-flex mb-2">
                  <label
                    htmlFor={`ingredient-${index}`}
                    className="visually-hidden"
                  >
                    Ingredient {index + 1}
                  </label>
                  <input
                    type="text"
                    id={`ingredient-${index}`}
                    name={`ingredients-${index}`}
                    value={ingredient}
                    onChange={(event) => handleIngredientChange(event, index)}
                    className="form-control"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-danger ms-2"
                    onClick={() => handleDeleteIngredient(index)}
                  >
                    X
                  </button>
                </div>
              ))}
              <div className="mb-3 d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddIngredient}
                >
                  Add Ingredient
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="instructions" className="form-label">
                Instructions
              </label>
              <textarea
                id="instructions"
                name="instructions"
                className="form-control"
                value={recipe.instructions}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="imageUrl" className="form-label">
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                className="form-control"
                value={recipe.imageUrl}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                className="form-control"
                value={recipe.category}
                onChange={handleChange}
                placeholder="Italian"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cookingTime" className="form-label">
                Cooking Time (approx. minutes)
              </label>
              <input
                type="number"
                min="1"
                id="cookingTime"
                name="cookingTime"
                className="form-control"
                value={recipe.cookingTime}
                onChange={handleChange}
                placeholder="5"
                required
              />
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button type="submit" className="btn btn-primary">
                Create Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
