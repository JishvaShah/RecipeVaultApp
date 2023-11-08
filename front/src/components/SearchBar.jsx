import PropTypes from "prop-types";

export const SearchBar = ({ password, setPassword }) => {
  return (
    <>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className="input-group">
              <input
                className="form-control border-end-0 border rounded-pill"
                type="search"
                value="search your favourite recipe"
                id="example-search-input"
              />
              <span className="input-group-append">
                <button
                  className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5"
                  type="button"
                >
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SearchBar.propTypes = {
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};
