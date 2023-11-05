import AuthForm from "../components/AuthForm";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        setPassword("");
        setEmail("");
        console.log("Login Successful!");
        return <Navigate replace to="/login" />;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Login Form</h1>
        </div>
      </div>
      <div className="row">
        <AuthForm
          buttonText="Login"
          onSubmit={onSubmit}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      </div>
    </div>
  );
};
