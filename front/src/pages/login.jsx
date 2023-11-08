import AuthForm from "../components/AuthForm";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [, setCookies] = useCookies(["access_token"]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
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
        setLoading(false);
        const data = await res.json();
        setCookies("access_token", data.token);
        window.localStorage.setItem("userID", data.userID);
        toast.success("Login Successful!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
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
          loading={loading}
        />
      </div>
    </div>
  );
};
