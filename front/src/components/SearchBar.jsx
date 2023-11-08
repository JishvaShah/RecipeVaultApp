import PropTypes from "prop-types";

export const SearchBar = ({ keyword, setKeyword, setCurrentPage }) => {
  return (
    <>
      <div className="col-md-9 mx-auto">
        <div className="input-group">
          <input
            className="form-control border-end-0 border rounded-pill ml-2"
            type="search"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search Your Favourite Recipe..."
            id="example-search-input"
          />
          <span className="input-group-append mx-2">
            <button
              className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5"
              type="button"
            >
              <i className="fa fa-search"></i>
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  setKeyword: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
