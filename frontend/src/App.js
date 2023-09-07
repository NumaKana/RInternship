import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Foods from "./components/pages/Foods";
import Home from "./components/pages/Home";
import { Header } from "./components/organisms/Header";
import { NavBar } from "./components/organisms/NavBar";
import Register from "./components/pages/Register";
import "./components/pages/Register";
import Edit from "./components/organisms/Edit";
import dayjs from "dayjs";
import Popup from "./components/organisms/Popup";
import img from "./img/panda_good.gif";

function App() {
  return (
    <div className="App">
      {/* <Routes>
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
      </Routes> */}
      <Popup message="congrats" img={img} notOpen={false} message1={"HELLO"} message2={"Have a good day!!!"}/>
      <NavBar />
    </div>
  );
}

export default App;
