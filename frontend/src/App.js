import "./App.css";
import Foods from "./components/pages/Foods";
import { Header } from "./components/organisms/Header";
import { NavBar } from "./components/organisms/NavBar";
import Register from './components/pages/Register';
import './components/pages/Register';

function App() {
  return (
    <div className="App">
      <Header />
      <Register></Register>
      <Foods />
      <NavBar />
    </div>
  );
}

export default App;
