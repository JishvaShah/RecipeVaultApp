import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export const NavBar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.location.href = "/login";
  };

  const handleProtectedRoute = () => {
    if (!cookies.access_token) {
      toast.warn("Please Login!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

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
              {!cookies.access_token ? (
                <>
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
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <div className="nav-link">
                      <Link
                        onClick={logout}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Logout
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link">
                      <Link
                        to="/update-account"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Account
                      </Link>
                    </div>
                  </li>
                </>
              )}
            </ul>
            <span className="navbar-text me-4">
              <div className="nav-link">
                <Link
                  to={cookies.access_token ? "/create-recipe" : "/login"}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={handleProtectedRoute}
                >
                  Create Recipe
                </Link>
              </div>
            </span>
            <span className="navbar-text me-4">
              <div className="nav-link">
                <Link
                  to={cookies.access_token ? "/saved-recipes" : "/login"}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={handleProtectedRoute}
                >
                  My Recipes
                </Link>
              </div>
            </span>

            {/* <span className="navbar-text me-4">
              <div className="nav-link">
                <Link
                  to={cookies.access_token ? "/favourites" : "/login"}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={handleProtectedRoute}
                >
                  My Favourites
                </Link>
              </div>
            </span> */}
          </div>
        </div>
      </nav>
    </div>
  );
};
