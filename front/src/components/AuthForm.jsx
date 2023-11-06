import PropTypes from "prop-types";
import Spinner from "./Spinner";

const AuthForm = ({
  buttonText,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  loading,
}) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-block">
                {!loading ? buttonText || "Submit" : <Spinner />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default AuthForm;
