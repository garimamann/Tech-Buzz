import { printIntrospectionSchema } from "graphql";
import { setUncaughtExceptionCaptureCallback } from "process";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { Link, withRouter } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import { LoginContext } from "../LoginContext";

const Header = () => {
  const history = useHistory();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const value = useContext(LoginContext);
  console.log(value);
  // const [authToken,setAuthState] = useState(localStorage.getItem(AUTH_TOKEN));
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fiex black">
        <div className="fw7 mr1">Hacker News</div>

        <Link to="/" className="ml1 no-underline black">
          posts
        </Link>
        {value.isLoggedin && !value.isAdmin && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link to="/create" className="ml1 no-underline black">
              create
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {value.isLoggedin ? (
          <div className="flex flex-fixed">
            {value.isAdmin ? (
              <Link to="/userlist" className="ml1 no-underline black">
                Users
              </Link>
            ) : (
              <Link to="/user" className="ml1 no-underline black">
                User
              </Link>
            )}

            <div className="ml1">|</div>
            <div
              className="ml1 pointer black"
              onClick={e => {
                localStorage.removeItem("AUTH_TOKEN");
                value.setLoginStatus({ isLoggedin: false, isAdmin: false });
                history.push("/");
              }}
            >
              LogOut
            </div>
          </div>
        ) : (
          <Link to="/login" className="ml1 no-underline black">
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export { Header };
