import React, { useEffect, useState } from "react";
import MySidebar from "../utils/sidebar";
import bckgrund2 from "../svg/bckgrund2.jpg";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../index.css";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TodaysTasks() {
  //create an empty array to store fetched data of tasks
  const [lists, setLists] = useState([]);
  let count = 0;
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [currentSelectedId, setCurrentSelectedId] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleOpen = (id) => {
    setOpenModal(true);
    setCurrentSelectedId(id);
    console.log(openModal);
  };

  const handleClose = () => {
    setOpenModal(false);
    console.log(openModal);
  };

  //functionn to filered lists of today
  function getTodaysList(list) {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;
    console.log(currentDate, list);

    setLists(
      list.filter((li) => {
        console.log(li.split("T") == currentDate);
        return li.split("T") == currentDate;
      })
    );
  }

  //function to fetch data
  const getLists = () => {
    axios
      .get("https://my-app-backend3.onrender.com/api/list")
      .then((res) => {
        getTodaysList(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  function UpdateList() {
    axios
      .put(
        `https://my-app-backend3.onrender.com/api/list/${currentSelectedId}`,
        {
          name: name,
          time: time,
        }
      )
      .then((res) => window.location.reload(true))
      .catch((err) => {
        alert(err.response.data);
        console.log(err);
      });

    handleClose();
    console.log(currentSelectedId);
  }

  function deleteTask(id) {
    axios
      .delete(`https://my-app-backend3.onrender.com/api/list/${id}`)
      .then(() => {
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
    } else {
      navigate("/");
    }

    getLists();
  }, []);

  console.log(lists);
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${bckgrund2})`,
        display: "flex",
        width: "100vw",
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
        <div>
          {lists.length == 0 ? (
            <h1>No task schduled today</h1>
          ) : (
            <h1>Today's tasks :</h1>
          )}
        </div>
        <br />
        <TableContainer component={Paper} sx={{ maxHeight: "600px" }}>
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
                <TableCell></TableCell>
                <TableCell></TableCell>
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
                  <TableCell align="center" className="edit">
                    <EditIcon onClick={() => handleOpen(row._id)} />
                    <Modal
                      open={openModal}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
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
                        <Button onClick={UpdateList} color="primary">
                          done
                        </Button>
                      </Box>
                    </Modal>
                  </TableCell>
                  <TableCell
                    align="center"
                    className="delete"
                    onClick={() => deleteTask(row._id)}
                  >
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
}

export default TodaysTasks;
