import React from "react";
import { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import * as AuthService from "./services/auth.service";
import IUser from "./types/user.type";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
// import Profile from "./components/Profile";
// import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";

import EventBus from "./common/EventBus";
import Working from "./components/Working";
import Collections from "./components/Collections";
import ProductPage from "./components/Product";

const App: React.FC = () => {
  // const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  // const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    // setShowModeratorBoard(false);
    // setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="nav-divs">
          <div
            className="nav-child"
            style={{
              justifyContent: "space-between",
            }}
          >
            <div style={{
              display: "flex",
              flexDirection: "row",
            }}>
              <Link to={"/"} className="logo">
                shibArmy
              </Link>
              <div className="navbar-nav">
                <li className="nav-item rounded">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>

                {/* {showModeratorBoard && (
                  <li className="nav-item rounded">
                    <Link to={"/mod"} className="nav-link">
                      Moderator Board
                    </Link>
                  </li>
                )}

                {showAdminBoard && (
                  <li className="nav-item rounded">
                    <Link to={"/admin"} className="nav-link">
                      Admin Board
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item rounded">
                    <Link to={"/user"} className="nav-link">
                      User
                    </Link>
                  </li>
                )} */}
              </div>
            </div>

            <div className="navbar-nav">
              <li className="nav-item rounded">
                <Link to={"/working"} className="nav-link">
                  IG
                </Link>
              </li>

              <li className="nav-item rounded">
                <Link to={"/working"} className="nav-link">
                  TW
                </Link>
              </li>

              <li className="nav-item rounded">
                <Link to={"/working"} className="nav-link">
                  SC
                </Link>
              </li>

              <li className="nav-item rounded">
                <Link to={"/working"} className="nav-link">
                  WP
                </Link>
              </li>
            </div>
          </div>

          <div
            className="nav-child"
            style={{
              justifyContent: "space-between",
            }}
          >
            <div className="navbar-nav">
              <li className="nav-item rounded">
                <Link to={"/working"} className="nav-link">
                  Roadmap
                </Link>
              </li>
            </div>

            <div className="navbar-nav">
              <li className="nav-item rounded">
                <Link to={"/collections"} className="nav-link">
                  Collections
                </Link>
              </li>
            </div>

            <div className="navbar-nav">
              <li className="nav-item rounded">
                <Link to={"/working"} className="nav-link">
                  Team
                </Link>
              </li>
            </div>

            <div className="navbar-nav">
              <li className="nav-item rounded">
                <Link to={"/working"} className="nav-link">
                  FAQ
                </Link>
              </li>
            </div>

            {currentUser ? (
              <div className="navbar-nav">
                <li className="nav-item rounded">
                  <Link to={"/working"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item rounded">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav">
                <li className="nav-item rounded log">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item rounded log">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div>
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/working" component={Working} />
          <Route exact path="/collections" component={Collections} />
          <Route exact path="/product" component={ProductPage} />
          {/* <Route exact path="/profile" component={Profile} /> */}
          {/* <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} /> */}
        </Switch>
      </div>
    </div>
  );
};

export default App;