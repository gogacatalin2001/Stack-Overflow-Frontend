import React, { useState } from 'react';

export const RegisterForm = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            username + '\n' +
            email + '\n' +
            password + '\n' +
            phone + '\n'
        );
    }
    // Call API to register user with entered credentials
    // Redirect to user dashboard

    return (
        <div className='wrapper d-flex align-items-center justify-content-center w-10'>
            <div className='register'>
                <h2 className='mb-3'>Join the Stack Overflow community</h2>
                <div className='form-group was-validated mb-2'>
                    <label className='form-label' htmlFor='email'>Email</label>
                    <input className='form-control' type='email' placeholder='youremail@gmail.com' id='email' name='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className='invalid-feedback'>
                        Please enter your email
                    </div>
                </div>
                <div className='form-group was-validated mb-2'>
                    <label className='form-label' htmlFor='username'>Username</label>
                    <input className='form-control' type='text' placeholder='Username' id='username' name='username' required value={username} onChange={(e) => setUsername(e.target.value)} />
                    <div className='invalid-feedback'>
                        Please enter your username
                    </div>
                </div>
                <div className='form-group was-validated mb-2'>
                    <label className='form-label' htmlFor='password'>Password</label>
                    <input className='form-control' type='password' placeholder='**********' id='password' name='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className='invalid-feedback'>
                        Please enter your password
                    </div>
                </div>
                <div className='form-group was-validated mb-2'>
                    <label className='form-label' htmlFor='phone'>Phone Number</label>
                    <input className='form-control' type='text' placeholder='+40*********' id='phone' name='phone' required value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <div className='invalid-feedback'>
                        Please enter your phone
                    </div>
                </div>
                <button className='btn btn-primary w-100 mt-2' type='submit'>Sign up</button>
                <label htmlFor='login-link'>Already have an account?</label>
                <button className='btn btn-link' id='login-link' name='login-link' onClick={() => props.onFormSwitch('login')}>Sign In.</button>
            </div>
        </div >
    )
}