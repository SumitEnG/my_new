import React, { useState } from "react";
import Login from "../utils/login";
import Signup from "../utils/signup";
import background from "../svg/2314950.webp";

function Home() {
  const [toggle, setToggle] = useState(false);

  //fubction to toggle between login and signup
  function toggleLogin() {
    setToggle(!toggle);
  }
  return (
    <div
      className="login_page"
      style={{
        backgroundImage: `url(${background})`,
        height: "100vh",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1",
      }}
    >
      {toggle ? <Signup /> : <Login />}
      {toggle ? (
        <div
          style={{
            fontWeight: "bold",
            // paddingLeft: "3rem",
            fontSize: "large",
            color: "white",
          }}
          className="toggle"
        >
          Already signed up?{" "}
          <span
            style={{
              color: "greenyellow",
              fontStyle: "italic",
              fontWeight: "bolder",
            }}
            onClick={toggleLogin}
          >
            click here
          </span>{" "}
          to login
        </div>
      ) : (
        <div
          style={{
            fontWeight: "bold",
            // paddingLeft: "3rem",
            fontSize: "large",
            color: "white",
          }}
          className="toggle"
        >
          Not a member{" "}
          <span
            style={{
              color: "greenyellow",
              fontStyle: "italic",
              fontWeight: "bolder",
            }}
            onClick={toggleLogin}
          >
            click here
          </span>{" "}
          to sign-up
        </div>
      )}
    </div>
  );
}

export default Home;
