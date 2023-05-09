import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";
import { Signup } from "./pages/Auth/Signup";
import { Login } from "./pages/Auth/Login";
import { Home } from "./pages/Home/Home";
import { Questions } from "./pages/Questions/Questions";
import { AskQuestion } from "./pages/Question/AskQuestion";
import { EditQuestion } from "./pages/Question/EditQuestion";
import { DisplayQuestion } from "./components/Questions/DisplayQuestion";
import "./App.css";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="questions" element={<Questions />} />
          <Route path="questions/:id" element={<DisplayQuestion />} />
          <Route path="questions/ask-question" element={<AskQuestion />} />
          <Route path="questions/edit-question/:id" element={<EditQuestion />} />
          {/* TODO add Tags and Users components */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
