import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import SignupValidation from './SignupValidation'
import { AboutAuth } from './AboutAuth'
import './Auth.css';

export const SignupForm = () => {
    const [values, setValues] = useState({
        email: '',
        username: '',
        password: '',
        phone: ''
    })

    const [errors, setErrors] = useState({})

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: [e.target.value] }));
        setErrors(SignupValidation(values));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(SignupValidation(values));
        // Call API to register user with entered credentials
        // Redirect to user dashboard
    }

    return (
        <section className='auth-section'>
            {<AboutAuth />}
            <div className='auth-container-2'>
                <form onSubmit={handleSubmit} >
                    <label htmlFor='email'>
                        <h5>Email</h5>
                        <input type='email' id='email' name='email' required onChange={handleInput} />
                        <div className='invalid-feedback'>
                            {errors.email}
                        </div>
                    </label>

                    <label htmlFor='username'>
                        <h5>Username</h5>
                        <input type='text' id='username' name='username' required onChange={handleInput} />
                        <div className='invalid-feedback'>
                            {errors.username}
                        </div>
                    </label>

                    <label htmlFor='password'>
                        <h5>Password</h5>
                        <input type='password' id='password' name='password' required onChange={handleInput} />
                        <p style={{ fontSize: '13px', color: '#666767' }}>
                            Passwords must contain at least eight characters,
                            <br />
                            including at least 1 letter and 1 number.
                        </p>
                        <div className='invalid-feedback'>
                            {errors.password}
                        </div>
                    </label>

                    <label htmlFor='phone'>
                        <h5>Phone Number</h5>
                        <input type='text' id='phone' name='phone' required onChange={handleInput} />
                        <div className='invalid-feedback'>
                            {errors.phone}
                        </div>
                    </label>

                    <label htmlFor='check'>
                        <input type='checkbox' id='check' />
                        <p>Register as moderator</p>
                    </label>

                    <button className='auth-btn' type='submit'>Sign up</button>
                </form>
                <p htmlFor='login-link'>
                    Already have an account?
                    <Link className='switch-form' type='button' to='/login' id='login-link' name='login-link'>Log in</Link>
                </p>
            </div>
        </section>
    )
}