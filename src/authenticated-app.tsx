import { useAuth } from "context/auth-context";
import ProjectScreen from "screens/project-list";

export const AuthenticatedApp = () => {
  // 有登录 所以也有登出

  const { logout } = useAuth();
  return (
    <>
      <button onClick={() => logout()}>退出</button>
      <ProjectScreen></ProjectScreen>
    </>
  );
};
