import React, { Fragment, useState } from "react";
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
