import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import LoginValidation from './LoginValidation'

import './Auth.css'
import icon from '../../assets/icon.svg'

export const LoginForm = () => {
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: [e.target.value] }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(LoginValidation(values));
        // Call API to authenticate user with entered credentials
        // Redirect to user dashboard upon successful login
    }

    return (
        <section className='auth-section'>
            <div className='auth-container-2'>
                <img className='login-logo' src={icon} alt='stack overflow' />
                <form onSubmit={handleSubmit} >
                    <label htmlFor='username'>
                        <h4>Username</h4>
                        <input type='text' id='username' name='username' required onChange={handleInput} />
                        <div className='invalid-feedback'>
                            {errors.username}
                        </div>
                    </label>

                    <label htmlFor='password'>
                        <h4>Password</h4>
                        <input type='password' id='password' name='password' required onChange={handleInput} />
                        <div className='invalid-feedback'>
                            {errors.password}
                        </div>
                    </label>

                    <button className='auth-btn' type='submit'>Log In</button>
                </form>
                <p htmlFor='register-link'>
                    Don't have an account?
                    <Link className='switch-form' to='/signup' type='button' id='register-link' name='register-link'>Sign up</Link>
                </p>
            </div>
        </section>
    )
}
