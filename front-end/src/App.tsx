import axios from "axios";
import useDataStore from "./zustand/data";
import { Data } from "./types";
import { useEffect, useState } from "react";
import Demo from "./pages/Table";
import TableComponent from "./pages/Table";
import DemoPie from "./pages/Chart";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const dataStore = useDataStore();


  useEffect(() => {
      axios
        .get<Data[]>("http://localhost:3000/data")
        .then((response) => {
          useDataStore.setState({ data: response.data });
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TableComponent />} />
            <Route path="/piechart" element={<DemoPie />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
