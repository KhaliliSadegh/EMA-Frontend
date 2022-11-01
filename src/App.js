import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/boards/BoardUser";
import BoardModerator from "./components/boards/BoardModerator";
import BoardAdmin from "./components/boards/BoardAdmin";

import AddEmployeeBatchCsv from "./components/employee/upload-batch.component";
import Employee from "./components/employee/employee.component";
import EmployeesList from "./components/employee/employees-list.component";

import { logout } from "./slices/auth";

import EventBus from "./common/EventBus";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          <Link to={"/"} className="navbar-brand">
            Employee Management Application
          </Link>
          <div className="collapse navbar-collapse">
            {/* <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li> */}

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard ? (
              <div className="navbar-nav mr-auto">
                {/* <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li> */}
                <li className="nav-item">
                  <Link to={"/employees"} className="nav-link active">
                    Employees List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link active">
                    Add Employee
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/upload-batch"} className="nav-link active">
                    Upload CSV
                  </Link>
                </li>
              </div>
            ) : (<li className="nav-item">

            </li>)}


          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link active">
                  {currentUser.username}
                  <img alt="profile" srcSet="https://img.icons8.com/doodle/96/user-male-circle.png 3x" />
                </Link>
              </li>
              <li className="nav-item">

                <Link to="/login" className="nav-link active" onClick={logOut}>
                  LogOut<img alt="logoutimage" srcSet="https://img.icons8.com/sf-black/128/logout-rounded-down.png 4x" />

                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link active">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link active">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/employees" element={<EmployeesList />} />
            <Route path="/upload-batch" element={<AddEmployeeBatchCsv />} />
            <Route path="/employees/:id" element={<Employee />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
