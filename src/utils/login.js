import React, { useState } from "react";
import "./login.css";
import png from "../svg/profile-icon-png-910-Windows.ico";
import png2 from "../svg/profile-icon-png-892(1).png";
import png3 from "../svg/PngItem_1407340.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //function to show notification of successfully logged-in
  const showSuccessToast = () => {
    toast.success("successfully logged-in ");
  };

  //function to show error occured while logging
  const showErrorToast = (msg) => {
    toast.error(msg);
  };

  //function to handle loging
  function handleSubmit(e) {
    e.preventDefault();
    toast.loading("Loading..."); //show loading toast while fetching data from endpoint

    //hitting endpoint using axios post mehthod by passing username and password as a object
    axios
      .post("https://my-app-backend3.onrender.com/api/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        toast.dismiss(); //dismiised the loading toast
        showSuccessToast();
        navigate("/dashboard");
        console.log(res.data);
        localStorage.setItem("token", res.data.token); //save token into localstorage
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("userId", res.data._id);
      })
      .catch((err) => {
        toast.dismiss();
        showErrorToast(err.response.data);
      });

    setUsername("");
    setPassword("");
  }

  return (
    <>
      <img src={png} className="profile_img" style={{ zIndex: "4" }} />
      <div
        className="login_container"
        style={{ height: "15rem", width: "20rem" }}
      >
        <div className="username">
          <img src={png2} />
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)} //eventlistner to get the input value of username
          />
        </div>

        <div className="password">
          <img src={png3} />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)} //eventlistner to get the input value of password
          />
        </div>
        <div className="others">
          <div className="checkbox">
            <input type="checkbox" />
            <label htmlFor="Remember me" style={{ fontWeight: "bold" }}>
              Remember me
            </label>
          </div>

          <div style={{ fontFamily: "cursive", fontStyle: "italic" }}>
            forget password?
          </div>
        </div>
      </div>
      <div className="btn" onClick={(e) => handleSubmit(e)}>
        <Toaster />
        <div>Login</div>
      </div>
    </>
  );
}

export default Login;
