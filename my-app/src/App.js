// import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import NoteState from "./context/notes/NoteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
function App() {
  return (
    <div className="App">
      
      <NoteState>
        <Router>
          <Navbar></Navbar>
          <Alert message={"this is amazing react app"}></Alert>
          <div className="container">
          <div className="container mb-3">
            <Routes>
              <Route exact path="/" element={<Home></Home>} />
              <Route path="/about" element={<About></About>} />
              <Route path="/login" element={<Login></Login>} />
              <Route path="/signup" element={<SignUp></SignUp>} />
            </Routes>
          </div>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
