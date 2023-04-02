import React, { useState } from 'react';
import './App.css';
import { SignupForm } from './components/SignupForm';
import { LoginForm } from './components/LoginForm';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
