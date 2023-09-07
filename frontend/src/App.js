import "./App.css";
import Foods from "./components/pages/Foods";
import { Header } from "./components/organisms/Header";
import { NavBar } from "./components/organisms/NavBar";
import Register from "./components/pages/Register";
import "./components/pages/Register";
import Edit from "./components/organisms/Edit";
import dayjs from "dayjs";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Foods /> */}
      {/* <Edit id={-1} name="トマト" category="卵" state="冷凍" date={dayjs()} /> */}
      <Register />
      <NavBar />
    </div>
  );
}

export default App;
