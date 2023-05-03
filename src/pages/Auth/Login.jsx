import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { logIn } from '../../actions/authActions'

import './Auth.css'
import icon from '../../assets/icon.svg'

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(logIn({ username, password }, navigate))
    }

    return (
        <section className='auth-section'>
            <div className='auth-container-2'>
                <img className='login-logo' src={icon} alt='stack overflow' />
                <form onSubmit={handleSubmit} >
                    <label htmlFor='username'>
                        <h4>Username</h4>
                        <input type='text' id='username' name='username' required onChange={(e) => setUsername(e.target.value)} />
                    </label>

                    <label htmlFor='password'>
                        <h4>Password</h4>
                        <input type='password' id='password' name='password' required onChange={(e) => setPassword(e.target.value)} />
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
