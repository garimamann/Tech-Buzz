import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface LoginStatus {
  isLoggedin: boolean;
  isAdmin: boolean;
  setLoginStatus: Dispatch<
    SetStateAction<{ isLoggedin: boolean; isAdmin: boolean }>
  >;
}

export const LoginContext = createContext<LoginStatus>();

export const LoginStatusProvider: React.FC = ({ children }) => {
  const [LoggedStatus, setLoginStatus] = useState({
    isLoggedin: false,
    isAdmin: false,
  });
  useEffect(() => {
    setLoginStatus({
      isLoggedin: localStorage.getItem("isLoggedin") === "true",
      isAdmin: localStorage.getItem("isAdmin") === "true",
    });
  }, []);
  useEffect(() => {
    localStorage.setItem("isLoggedin", LoggedStatus.isLoggedin.toString());
    localStorage.setItem("isAdmin", LoggedStatus.isAdmin.toString());
  });

  return (
    <LoginContext.Provider
      value={{
        isLoggedin: LoggedStatus.isLoggedin,
        isAdmin: LoggedStatus.isAdmin,
        setLoginStatus,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
