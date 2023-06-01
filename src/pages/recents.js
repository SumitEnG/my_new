import React, { useEffect, useState } from "react";
import MySidebar from "../utils/sidebar";
import bckgrund2 from "../svg/bckgrund2.jpg";
import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { SendOutlined } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Recents() {
  const [lists, setLists] = useState([]);
  const [valueDate, setValueDate] = useState("");
  const [showTable, setShowTable] = useState(false);
  const navigate = useNavigate();
  let count = 0;

  function getTodaysList(list) {
    setLists(
      list.filter((li) => {
        console.log(li.date.slice(0, 10) == valueDate);
        console.log(valueDate, li.date.slice(0, 10));
        return li.date.slice(0, 10) == valueDate;
      })
    );

    if (lists.length > 0) {
      setShowTable(true);
    }
  }

  const getLists = () => {
    axios
      .get("https://my-app-backend3.onrender.com/api/list")
      .then((res) => {
        getTodaysList(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
    } else {
      navigate("/");
    }
  }, []);

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
          marginLeft: "10rem",
          // alignContent: "center"
        }}
      >
        <br />

        <div className="search">
          <TextField
            label="enter the date (yyyy-dd-mm)"
            variant="filled"
            color="secondary"
            onChange={(e) => {
              setValueDate(e.target.value);
            }}
          />
          <Button onClick={getLists}>
            <SendOutlined />
          </Button>
        </div>

        <TableContainer
          component={Paper}
          sx={{ maxHeight: "600px", margin: "5rem" }}
        >
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    color: "white",
                    backgroundColor: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                  },
                }}
              >
                <TableCell></TableCell>
                <TableCell>Sl. No.</TableCell>
                <TableCell>Tasks</TableCell>
                <TableCell>Time of completion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lists.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{
                    "& td": {
                      color: "white",
                      backgroundColor: "rgb(113,180,147)",
                    },
                  }}
                  hover
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="success"
                      // checked={isItemSelected}
                      // inputProps={{
                      //   "aria-labelledby": labelId,
                      // }}
                    />
                  </TableCell>
                  <TableCell align="center">{(count = count + 1)}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
}

export default Recents;
