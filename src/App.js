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
import { Tags } from "./pages/Tags/Tags";
import { Users } from "./pages/Users/Users";
import { UserProfile } from "./components/Users/UserProfile";
import "./App.css";
import { BannedUser } from "./pages/Auth/BannedUser";

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
          <Route
            path="questions/edit-question/:id"
            element={<EditQuestion />}
          />
          <Route path="tags" element={<Tags />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserProfile />} />
          <Route path="banned" element={<BannedUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
