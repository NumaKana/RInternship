import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Foods from "./components/pages/Foods";
import Home from "./components/pages/Home";
import { Header } from "./components/organisms/Header";
import { NavBar } from "./components/organisms/NavBar";
import Register from "./components/pages/Register";
import "./components/pages/Register";
import Edit from "./components/organisms/Edit";
import dayjs from "dayjs";\

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/foods"
          element={
            <>
              <Header title="食品一覧" />
              <Foods />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header title="食品追加" />
              <Register />
            </>
          }
        />
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;
