import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Dashboard, Restore } from "@mui/icons-material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import "../index.css";

function MySidebar() {
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();

  return (
    //import and using sidebar from react-pro-sidebar
    <Sidebar style={{ height: "100vh", backgroundColor: "green" }}>
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          //function for expanding sidebar
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: "center" }}
          className="main"
        >
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <h2
              style={{
                height: "2rem",
                width: "2rem",
                background: "blue",
                borderRadius: "50%",
                fontWeight: "bold",
              }}
            >
              {/* displayig 1st index of username */}
              {localStorage.getItem("username")[0]}
            </h2>
            <h2>{localStorage.getItem("username")}</h2>
          </div>
        </MenuItem>
        <MenuItem
          icon={<Dashboard />}
          className="dashboard"
          onClick={() => navigate("/dashboard")}
        >
          <h3>Dashboard</h3>
        </MenuItem>
        <MenuItem
          icon={<AssignmentIcon />}
          onClick={() => navigate("/todaysTasks")}
        >
          <h3>Todays Tasks</h3>
        </MenuItem>
        <MenuItem icon={<Restore />} onClick={() => navigate("/recents")}>
          <h3>Recent Tasks</h3>
        </MenuItem>
        <MenuItem
          icon={<LogoutIcon />}
          //logout function
          onClick={() => {
            localStorage.removeItem("token"); //remove token,thus only logged in user can go to dashboard page
            navigate("/");
          }}
          className="logout"
        >
          <h3>Logout</h3>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default MySidebar;
