import AuthForm from "../components/AuthForm";

export const Register = () => {
  const onButtonClick = (email, password) => {
    console.table({ email, password });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Register Form</h1>
        </div>
      </div>
      <div className="row">
        <AuthForm buttonText="Register" onButtonClick={onButtonClick} />
      </div>
    </div>
  );
};
