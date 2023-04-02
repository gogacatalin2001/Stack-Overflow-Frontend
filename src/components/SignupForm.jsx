import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignupValidation from './SignupValidation';

export const SignupForm = () => {
    const [values, setValues] = useState({
        email: '',
        username: '',
        password: '',
        phone: ''
    })

    const [errors, setErrors] = useState({})

    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}));
        setErrors(SignupValidation(values));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(SignupValidation(values));
        // Call API to register user with entered credentials
        // Redirect to user dashboard
    }

    return (
        <div className='wrapper d-flex align-items-center justify-content-center w-100'>
            <div className='register bg-white'>
                <h2 className='mb-3'>Join the Stack Overflow community</h2>
                <form onSubmit={handleSubmit} >
                    <div className='form-group mb-2'>
                        <label className='form-label' htmlFor='email'><strong>Email</strong></label>
                        <input className='form-control' type='email' id='email' name='email' required onChange={handleInput} />
                        <div className='invalid-feedback'>
                            {errors.email}
                        </div>
                    </div>
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
                    <div className='form-group mb-2'>
                        <label className='form-label' htmlFor='phone'><strong>Phone Number</strong></label>
                        <input className='form-control' type='text' id='phone' name='phone' required onChange={handleInput} />
                        <div className='invalid-feedback'>
                            {errors.phone}
                        </div>
                    </div>
                    <button className='btn btn-primary w-100 mt-2' type='submit'>Sign up</button>
                </form>
                <label htmlFor='login-link'>Already have an account?</label>
                <Link to='/login' className='btn btn-link' type='button' id='login-link' name='login-link'>Log In.</Link>
            </div>
        </div >
    )
}