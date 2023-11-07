import PropTypes from "prop-types";
import Spinner from "./Spinner";

const UpdateAccountForm = ({
  buttonText,
  onPasswordChange,
  email,
  password,
  setPassword,
  deleteLoading,
  passwordLoading,
  onDeleteAccount,
}) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={onDeleteAccount}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                disabled
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                readOnly
                value={email}
                required
              />
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="inputPassword2" className="visually-hidden">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword2"
                  placeholder="New Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-primary mb-3"
                  onClick={onPasswordChange}
                  disabled={deleteLoading || passwordLoading}
                >
                  {!passwordLoading ? "Update Password" : <Spinner />}
                </button>
              </div>
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-danger btn-block"
                disabled={deleteLoading || passwordLoading}
              >
                {!deleteLoading ? buttonText || "Submit" : <Spinner />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

UpdateAccountForm.propTypes = {
  buttonText: PropTypes.string,
  onPasswordChange: PropTypes.func.isRequired,
  onDeleteAccount: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  deleteLoading: PropTypes.bool.isRequired,
  passwordLoading: PropTypes.bool.isRequired,
};

export default UpdateAccountForm;
