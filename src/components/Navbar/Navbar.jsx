import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.svg'
import search from '../../assets/search.svg'
import { Avatar } from '../Avatar/Avatar'
import './Navbar.css'

export const Navbar = () => {

    var User = null;

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
                    // <Link to='/auth/register' className='nav-item nav-links'>Sign up</Link>
                    <>
                        <Link to='/login' className='nav-item nav-links'>Log in</Link>
                        <Link to='/signup' className='nav-item nav-links signup-btn'>Sign up</Link>
                    </>
                    :
                    <>
                        <Link to='/user-id=?' style={{ color: 'white', textDecoration: 'none' }}>
                            <Avatar
                                backgroundColor='#009dff'
                                px='10px'
                                py='7px'
                                borderRadius='50%'
                            >
                                C
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