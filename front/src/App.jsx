import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { SavedRecipes } from "./pages/saved-recipe";
import { Auth } from "./pages/auth";
import { CreateRecipes } from "./pages/create-recipe";

export default function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/create-recipe" element={<CreateRecipes />} />
            <Route path="/saved-recipes" element={<SavedRecipes />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}
