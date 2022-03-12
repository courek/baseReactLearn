import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import ProjectScreen from "screens/project-list";
// import { LoginScreen } from "unauthenticated-app/login";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";

function App() {
  // 要用到useAuth了

  const { user } = useAuth();

  return (
    <div className="App">
      {/* <ProjectScreen></ProjectScreen> */}
      {/* <LoginScreen></LoginScreen> */}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
