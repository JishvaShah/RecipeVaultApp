import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { SavedRecipes } from "./pages/saved-recipe";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { CreateRecipes } from "./pages/create-recipe";
import { NavBar } from "./components/NavBar";

export default function App() {
  return (
    <>
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-recipe" element={<CreateRecipes />} />
            <Route path="/saved-recipes" element={<SavedRecipes />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}
