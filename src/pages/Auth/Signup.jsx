import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


import { AboutAuth } from '../../components/Auth/AboutAuth'
import { signUp } from '../../actions/authActions'
import './Auth.css';

export const Signup = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [role, setRole] = useState('USER')


    const dispatch = useDispatch()
    const navigate = useNavigate() 

    const selectRole = (checked) => {
        if (checked) {
            setRole('MODERATOR')
        } else {
            setRole('USER')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp({ username, email, password, phoneNumber, role }, navigate))
    }

    return (
        <section className='auth-section'>
            {<AboutAuth />}
            <div className='auth-container-2'>
                <form onSubmit={handleSubmit} >
                    <label htmlFor='email'>
                        <h5>Email</h5>
                        <input type='email' id='email' name='email' required onChange={(e) => setEmail(e.target.value)} />
                    </label>

                    <label htmlFor='username'>
                        <h5>Username</h5>
                        <input type='text' id='username' name='username' required onChange={(e) => setUsername(e.target.value)} />
                    </label>

                    <label htmlFor='password'>
                        <h5>Password</h5>
                        <input type='password' id='password' name='password' required onChange={(e) => setPassword(e.target.value)} />
                        <p style={{ fontSize: '13px', color: '#666767' }}>
                            Passwords must contain at least eight characters,
                            <br />
                            including at least 1 letter and 1 number.
                        </p>
                    </label>

                    <label htmlFor='phone'>
                        <h5>Phone Number</h5>
                        <input type='text' id='phone' name='phone' required onChange={(e) => setPhoneNumber(e.target.value)} />
                    </label>

                    <label htmlFor='check'>
                        <input type='checkbox' onChange={(e) => selectRole(e.target.checked)} id='check' />
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