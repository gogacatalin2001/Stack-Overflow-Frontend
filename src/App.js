import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Navbar } from './components/Navbar/Navbar'
import { SignupForm } from './components/Auth/SignupForm'
import { LoginForm } from './components/Auth/LoginForm'
import { Home } from './components/Home/Home'
import { Questions } from './components/Questions/Questions'
import './App.css'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/questions' element={<Questions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
