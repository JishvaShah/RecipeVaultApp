import UpdateAccountForm from "../components/UpdateAccountForm";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export const UpdateAccount = () => {
  const [email, setEmail] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [cookies] = useCookies(["access_token"]);
  const [, setCookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchUserEmail = async () => {
      setDeleteLoading(true);
      const token = cookies.access_token;
      if (cookies.access_token) {
        try {
          const response = await fetch("/api/user/user-by-id", {
            method: "GET",
            headers: {
              Authorization: token,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setEmail(data.user.email);
          } else {
            throw new Error("Failed to fetch email");
          }
        } catch (error) {
          console.error(error);
        } finally {
          setDeleteLoading(false);
        }
      }
    };

    fetchUserEmail();
  }, [cookies.access_token]);

  const onPasswordChange = async (event) => {
    event.preventDefault();
    setPasswordLoading(true);
    const token = cookies.access_token;
    try {
      const res = await fetch("/api/user/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ newPassword: password }),
      });
      if (res.ok) {
        setPassword("");
        setPasswordLoading(false);
        toast.success("Password change successful!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        const errorData = await res.json();
        toast.error(errorData.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      console.log(err);
    }
    setPasswordLoading(false);
  };

  const onDeleteAccount = async (event) => {
    event.preventDefault();
    setDeleteLoading(true);
    const token = cookies.access_token;
    try {
      const res = await fetch("/api/user/delete-user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (res.ok) {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        toast.success("User Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setDeleteLoading(false);
        window.location.href = "/";
      } else {
        const errorData = await res.json();
        toast.error(errorData.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setDeleteLoading(false);
      }
    } catch (err) {
      console.log(err);
      setDeleteLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Update Account</h1>
        </div>
      </div>
      <div className="row">
        <UpdateAccountForm
          buttonText="Delete Account"
          onPasswordChange={onPasswordChange}
          onDeleteAccount={onDeleteAccount}
          email={email}
          password={password}
          setPassword={setPassword}
          deleteLoading={deleteLoading}
          passwordLoading={passwordLoading}
        />
      </div>
    </div>
  );
};
