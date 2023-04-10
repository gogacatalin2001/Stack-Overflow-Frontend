import React from 'react'
import { NavLink } from 'react-router-dom'

import globe from '../../assets/globe.png'
import './LeftSidebar.css'


export const LeftSidebar = () => {
    return (
        <div className='left-sidebar'>
            <nav className='side-nav'>
                <NavLink to='/' className='side-nav-links'>
                    <p>Home</p>
                </NavLink>
                <div className='side-nav-div'>
                    <div><p>PUBLIC</p></div>
                    <NavLink to='/questions' className='side-nav-links' style={{ paddingLeft: '10px' }}>
                        <img src={globe} style={{ paddingLeft: '10px' }} alt='globe' />
                        <p>Questions</p>
                    </NavLink>
                    <NavLink to='/tags' className='side-nav-links' style={{ paddingLeft: '40px' }}>
                        <p>Tags</p>
                    </NavLink>
                    <NavLink to='/users' className='side-nav-links' style={{ paddingLeft: '40px' }}>
                        <p>Users</p>
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}