/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logOut } from '../../actions/userActions'
import logo from '../../assets/logo.svg'
import search from '../../assets/search.svg'
import { Avatar } from '../Avatar/Avatar'
import './Navbar.css'

export const Navbar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    var user = useSelector(state => state.userReducer).user

    const handleLogOut = () => {
        dispatch(logOut())
        navigate('/')
    }

    return (
        <nav className='main-nav'>
            <div className='navbar'>
                <Link to='/' className='nav-item nav-logo'>
                    <img src={logo} alt='logo' />
                </Link>
                <Link to='/' className='nav-item nav-btn'>About</Link>
                <Link to='/' className='nav-item nav-btn'>Products</Link>
                <Link to='/' className='nav-item nav-btn'>For Teams</Link>
                <form>
                    <input type='text' placeholder='Search...' />
                    <img className='search-icon' src={search} alt='search' width='18' />
                </form>
                {user === null ?
                    <>
                        <Link to='/login' className='nav-item nav-links'>Log in</Link>
                    </>
                    :
                    <>
                        <Link to='/user' style={{ color: 'white', textDecoration: 'none' }}>
                            <Avatar
                                backgroundColor='#009dff'
                                px='10px'
                                py='7px'
                                borderRadius='50%'
                            >
                                {user.username.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                        <button className='nav-item nav-links' onClick={handleLogOut} >Log out</button>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar;