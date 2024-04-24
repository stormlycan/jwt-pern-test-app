import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";


// Components
function App() {

  // State variabel to check authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to toogle true false

  const setAuth = boolean  => {
    setIsAuthenticated(boolean);
  }

  async function isAuth() {
    try {
      // console.log( {token: localStorage.token})
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: {token: localStorage.token }
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)

    } catch (err) {
      console.error(err.message);
    }

  }

  useEffect(() => {
    if (localStorage.token) {
      isAuth();
    } else {
      setIsAuthenticated(false);
    }
  })

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setAuth={setAuth}/>} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register setAuth={setAuth}/>} />
            <Route path="/dashboard" element={!isAuthenticated ? <Navigate to="/login"/>: <Dashboard setAuth={setAuth}/>} />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
