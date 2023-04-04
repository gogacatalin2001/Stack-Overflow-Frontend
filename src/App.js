import "./App.css";
import { Navbar } from "./components/Navbar";
import React from "react";
import { SignupForm } from "./components/SignupForm";
import { LoginForm } from "./components/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
