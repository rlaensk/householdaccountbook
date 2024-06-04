import "./Conponent_css/App.css";
import "./Conponent_css/NavMenu.css";
import "./Conponent_css/Header.css";
import "./Conponent_css/Main_write.css";
import Header from "./Component/Header";
import { Nav } from "./Component/Nav";

function App() {
  return (
    <div className="App">
      <Header />

      <Nav />
    </div>
  );
}

export default App;
