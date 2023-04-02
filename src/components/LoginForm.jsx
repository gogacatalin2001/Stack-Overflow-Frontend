import React, { useState } from 'react';
import '../App.css';

export const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username + ' ' + password);
        // Call API to authenticate user with entered credentials
        // Redirect to user dashboard upon successful login
    }

    return (
        <div className='wrapper d-flex align-items-center justify-content-center w-10'>
            <div className='login'>
                <h2 className='mb-3'>Login</h2>
                <form className='needs-validation'>
                    <div className='form-group was-validated mb-2'>
                        <label className='form-label' htmlFor='username'>Username</label>
                        <input className='form-control' required  type='text' placeholder='Username' id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <div className='invalid-feedback'>
                            Please enter your username
                        </div>
                    </div>
                    <div className='form-group was-validated mb-2'>
                        <label className='form-label' htmlFor='password'>Password</label>
                        <input className='form-control' required type='password' placeholder='**********' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <div className='invalid-feedback'>
                            Please enter your password
                        </div>
                    </div>
                    <button className='btn btn-primary w-100 mt-2' type='submit'>Log In</button>
                    <label htmlFor='register-link'>Don't have an account?</label>
                    <button className='btn btn-link'id='register-link' name='register-link' onClick={() => props.onFormSwitch('register')}> Sign up.</button>
                </form>
            </div>
        </div>
    )
}
