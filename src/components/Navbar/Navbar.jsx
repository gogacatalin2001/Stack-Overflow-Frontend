import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'

import logo from '../../assets/logo.svg'
import search from '../../assets/search.svg'
import { Avatar } from '../Avatar/Avatar'
import { setCurrentUser } from '../../actions/setCurrentUser'
import './Navbar.css'

export const Navbar = () => {

    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))


    useEffect(() => {
        if (User !== null) {
            dispatch(setCurrentUser(jwtDecode(localStorage.getItem('User'))))
        }
    }, [dispatch])

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
                {User === null ?
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
                                {User.username}
                            </Avatar>
                        </Link>
                        <button className='nav-item nav-links'>Log out</button>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar;