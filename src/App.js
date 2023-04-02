import React, { useState } from 'react';
import './App.css';
import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div>
      {
        currentForm === "login" ? <LoginForm onFormSwitch={toggleForm}/> : <RegisterForm onFormSwitch={toggleForm}/>
      }
    </div>
  );
}

export default App;
