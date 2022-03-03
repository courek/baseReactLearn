import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import ProjectScreen from "screens/project-list";
import { LoginScreen } from "screens/login";

function App() {
  return (
    <div className="App">
      {/* <ProjectScreen></ProjectScreen> */}
      <LoginScreen></LoginScreen>
    </div>
  );
}

export default App;
