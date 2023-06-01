import React, { useState } from "react";
import "./login.css";
import "./signup.css";
import png from "../svg/profile-icon-png-910-Windows.ico";
import png2 from "../svg/profile-icon-png-892(1).png";
import png3 from "../svg/PngItem_1407340.png";
import png4 from "../svg/email-icon-121(1).png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cPass, setcPass] = useState("");
  const [email, setEmail] = useState("");

  //function to show notification of successfully registered
  const showSuccessToast = () => {
    toast.success("successfully registered , go to login page ");
  };

  //function to show error occured while sign-up
  const showErrorToast = (msg) => {
    toast.error(msg);
  };

  function handleRegister(e) {
    e.preventDefault();

    toast.loading("Loading...");
    if (password != cPass) {
      alert("password and confirm password should be same");
    } else {
      axios
        .post(
          "https://my-app-backend3.onrender.com/api/register",
          {
            username: username,
            password: password,
            email: email,
          },
          {
            "Content-Type": "text/plain",
          }
        )
        .then((res) => {
          toast.dismiss();
          showSuccessToast();
        })
        .catch((err) => {
          toast.dismiss();
          showErrorToast(err.response.data);
        });
    }
    setUsername("");
    setPassword("");
    setcPass("");
    setEmail("");
  }

  return (
    <>
      <img src={png} className="profile_img" style={{ zIndex: "4" }} />
      <div
        className="login_container"
        style={{ height: "20rem", width: "20rem" }}
      >
        <div className="username">
          <img src={png2} />
          <input
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="password">
          <img src={png3} />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="password" style={{ paddingTop: "1.2rem" }}>
          <img src={png3} />
          <input
            type="text"
            placeholder="confirm-password"
            onChange={(e) => {
              setcPass(e.target.value);
            }}
          />
        </div>

        <div className="email">
          <img src={png4} />
          <input
            type="text"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="btn" onClick={(e) => handleRegister(e)}>
        <div>Signup</div>
        <Toaster />
      </div>
    </>
  );
}

export default Signup;
