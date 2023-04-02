import '../App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginValidation';
import LoginValidation from './LoginValidation';

export const LoginForm = () => {
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(LoginValidation(values));
        // Call API to authenticate user with entered credentials
        // Redirect to user dashboard upon successful login
    }

    return (
        <div className='wrapper d-flex align-items-center justify-content-center w-100'>
            <div className='login bg-white'>
                <h2 className='mb-3'>Login</h2>
                <form onSubmit={handleSubmit} >
                    <div className='form-group mb-2'>
                        <label className='form-label' htmlFor='username'><strong>Username</strong></label>
                        <input className='form-control' type='text' id='username' name='username' required onChange={handleInput} />
                        <div className='invalid-feedback'>
                            {errors.username}
                        </div>
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label' htmlFor='password'><strong>Password</strong></label>
                        <input className='form-control' type='password' id='password' name='password' required onChange={handleInput} />
                        <div className='invalid-feedback'>
                            {errors.password}
                        </div>
                    </div>
                    <button className='btn btn-primary w-100 mt-2' type='submit'>Log In</button>
                </form>
                <label htmlFor='register-link'>Don't have an account?</label>
                <Link to='/signup' className='btn btn-link' type='button' id='register-link' name='register-link'>Sign up.</Link>
            </div>
        </div>
    )
}
