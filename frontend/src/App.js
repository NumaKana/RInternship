import "./App.css";
import Foods from "./components/pages/Foods";
import { Header } from "./components/organisms/Header";
import { NavBar } from "./components/organisms/NavBar";

function App() {
  return (
    <div className="App">
      <Header />
      <Foods />
      <NavBar />
    </div>
  );
}

export default App;
