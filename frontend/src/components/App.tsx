import React from "react";
import logo from "./logo.svg";
import "../styles/App.css";
import { CreateLink } from "./CreateLink";
import LinkList from "./LinkList";
import Login from "./Login";
import UserProfile from "./UserProfile";
import UpdateLink from "./UpdateLink";
import UserList from "./UserList";
import { Header } from "./Header";
import { Switch, Route } from "react-router-dom";
import { LoginStatusProvider } from "../LoginContext";

function App() {
  return (
    <LoginStatusProvider>
    <div className="center w85">      
      <Header />
      
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/user" component={UserProfile} />
          <Route exact path="/update" component={UpdateLink } />
          <Route exact path="/userlist" component={UserList } />
        </Switch>
      </div>
    </div>
    </LoginStatusProvider>
  );
}

export default App;
