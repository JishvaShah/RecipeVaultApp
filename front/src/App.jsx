import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SavedRecipes } from "./pages/SavedRecipes";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { CreateRecipes } from "./pages/CreateRecipe";
import { NavBar } from "./components/NavBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <div>
        <Router>
          <NavBar />
          <ToastContainer />
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
