import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Recents from "./pages/recents";
import TodaysTasks from "./pages/todaysTasks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/recents" element={<Recents />} />
          <Route exact path="/todaysTasks" element={<TodaysTasks />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
