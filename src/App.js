import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import * as Common from "./Common";
function App() {
  useEffect(() => {
    Common.callApi("/api/server.php", ["fetch"], (result) => {
      console.log(result);
    });
  }, []);
  return (
    <div className="App">
      <h1>Hey</h1>
    </div>
  );
}

export default App;
