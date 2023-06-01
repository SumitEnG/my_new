import React, { useEffect, useState } from "react";
import MySidebar from "../utils/sidebar";
import bckgrund2 from "../svg/bckgrund2.jpg";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, TextField } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Dashboard() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  //functoion to show success msg while req a post to add in list
  const showSuccessToas = () => {
    toast.success("Successfuly added to todays task");
  };

  //function to show error occured while req a post to add in list

  const showErrorToast = (msg) => {
    toast.error(msg);
  };

  // checking if user doesnot have have token then go to homepage,not allowed in dashboard
  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
    } else {
      navigate("/");
    }
  }, []);

  //function to post a task to mongodb
  function handleAddTask() {
    axios
      .post("https://my-app-backend3.onrender.com/api/list", {
        name: name,
        time: time,
      })
      .then((res) => {
        showSuccessToas();
      })
      .catch((err) => showErrorToast(err.response.data));

    setName("");
    setTime("");
  }

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${bckgrund2})`,
        display: "flex",
      }}
    >
      <MySidebar />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "20rem",
          // alignContent: "center"
        }}
      >
        <h1>Have a nice day! let's make Todays schedule </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Checkbox {...label} color="secondary" />
          <TextField
            label="Task to do"
            variant="filled"
            color="secondary"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            label="Time of task"
            variant="filled"
            color="secondary"
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <Toaster
            toastOptions={{
              className: "",
              style: {
                border: "1px solid #713200",
                padding: "10px",
                color: "#713200",
                marginTop: "10rem",
                marginLeft: "5rem",
              },
            }}
            // containerStyle={{
            //   position: "relative",
            //   top: "5rem",
            //   left: "-15rem",
            //   width: "10vw",
            // }}
          />
          <Button variant="outlined" color="secondary" onClick={handleAddTask}>
            Add a task <PlaylistAddIcon />
          </Button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
