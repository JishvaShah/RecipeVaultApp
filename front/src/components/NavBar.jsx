import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg border-bottom"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container-fluid">
          <div className="navbar-brand">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <FontAwesomeIcon icon={faKitchenSet} />
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="navbar-brand">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Home
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Register
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Login
                  </Link>
                </div>
              </li>
            </ul>
            <span className="navbar-text me-4">
              <div className="nav-link">
                <Link
                  to="/create-recipe"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Create Recipe
                </Link>
              </div>
            </span>
            <span className="navbar-text me-4">
              <div className="nav-link">
                <Link
                  to="/saved-recipes"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  My Recipes
                </Link>
              </div>
            </span>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};
