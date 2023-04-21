import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";
import { SignupForm } from "./components/Auth/SignupForm";
import { LoginForm } from "./components/Auth/LoginForm";
import { Home } from "./components/Home/Home";
import { Questions } from "./components/Questions/Questions";
import { AskQuestion } from "./components/AskQuestion/AskQuestion";
import { DisplayQuestion } from "./components/Questions/DisplayQuestion";
import "./App.css";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="questions" element={<Questions />}></Route>
          <Route path="questions/:id" element={<DisplayQuestion />} />
          <Route path="questions/ask-question" element={<AskQuestion />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
