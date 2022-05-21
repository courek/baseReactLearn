import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import ProjectScreen from "screens/project-list";
// import { LoginScreen } from "unauthenticated-app/login";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallBack } from "components/lib";
// import ErrorBoundary from "antd/lib/alert/ErrorBoundary";  // 不是react 内置的ErrorBoundary 现在自己学习用的是自己写的. 实际项目在用别人的库

function App() {
  // 要用到useAuth了

  const { user } = useAuth();

  return (
    <div className="App">
      {/* <ProjectScreen></ProjectScreen> */}
      {/* <LoginScreen></LoginScreen> */}

      <ErrorBoundary fallbackRender={FullPageErrorFallBack}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
