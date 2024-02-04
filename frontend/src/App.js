import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Link,
} from "react-router-dom";
import Home from "./components/pages/home";
import Login from "./components/pages/Login";
import Customers from "./components/pages/Customers";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact={true} />
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </Router>
  );
}

export default App;