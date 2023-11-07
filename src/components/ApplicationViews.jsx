import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login.jsx";
import Home from "../pages/Home";
import { RockForm } from "./RockForm.jsx";
import { RockList } from "./RockList.jsx";
import { Register } from "../pages/Register.jsx";

export const ApplicationViews = () => {
  const [rocksState, setRocksState] = useState([
    {
      id: 1,
      name: "Sample",
      type: {
        id: 1,
        label: "Volcanic",
      },
    },
  ]);
  // showAll now needed because it's passed up from RockList component

  const fetchRocksFromAPI = async (showAll) => {
    // because URL is going to change depending on showAll true or false, mutable variable and conditional to handle that
    // original URL will now be default value stored in url variable
    let url = "http://localhost:8000/rocks";
    // now checking if showAll IS NOT true, then url is current user
    if (showAll !== true) {
      url = "http://localhost:8000/rocks?owner=current";
    }
    // response is now fetching url variable depending on which condition is met
    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rock_token")).token
        }`,
      },
    });
    const rocks = await response.json();
    setRocksState(rocks);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<Home />} />
          {/* this is passing rockState and fetchRocks to RockList as props */}
          <Route
            path="/allrocks"
            // showAll allows us to differentiate between all rocks and auth user rocks
            // it's a prop so needs to be passed elsewhere
            element={
              <RockList
                rocks={rocksState}
                fetchRocks={fetchRocksFromAPI}
                showAll={true}
              />
            }
          />
          <Route
            path="/create"
            element={<RockForm fetchRocks={fetchRocksFromAPI} />}
          />
          <Route
            path="/mine"
            element={
              <RockList
                rocks={rocksState}
                fetchRocks={fetchRocksFromAPI}
                showAll={false}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
