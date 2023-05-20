/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logOut } from '../../actions/authActions'
import logo from '../../assets/logo.svg'
import search from '../../assets/search.svg'
import { Avatar } from '../Avatar/Avatar'
import './Navbar.css'
import { setCurrentUser } from '../../actions/userActions'
import jwtDecode from 'jwt-decode'

export const Navbar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    var user = useSelector(state => state.userReducer.user)
    var token = localStorage.getItem("Token")

    const [searchValue, setSearchValue] = useState(null)

    useEffect(() => {
        // console.log(searchValue)
    }, [])

    useEffect(() => {
        if (token) {
            if (jwtDecode(token).exp * 1000 < new Date().getTime()) {
                handleLogOut()
            }
        }
        dispatch(setCurrentUser(token !== null ? JSON.stringify(jwtDecode(token)) : null))
    }, [dispatch])

    const handleLogOut = () => {
        dispatch(logOut())
        dispatch(setCurrentUser(null))
        navigate('/')
    }

    const handleFilterQuestions = (searchValue) => {
        // TODO filter the questions
        const filters= {
            userId: 1,
        }
        setSearchValue(searchValue)
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
                    <input type='text' placeholder='Search...' onSubmit={e => handleFilterQuestions(e.target.value)} />
                    <img className='search-icon' src={search} alt='search' width='18' />
                </form>
                {user === null ?
                    <>
                        <Link to='/login' className='nav-item nav-links'>Log in</Link>
                    </>
                    :
                    <>
                        <Link to={`/users/${user?.userId}`} style={{ color: 'white', textDecoration: 'none' }}>
                            <Avatar
                                backgroundColor='#009dff'
                                px='10px'
                                py='10px'
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