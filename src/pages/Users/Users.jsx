/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import { LeftSidebar } from '../../components/LeftSidebar/LeftSidebar'
import { getAllUsers } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { UserList } from '../../components/Users/UserList'

import './Users.css'

export const Users = () => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.userReducer.users)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className='home-container-2'>
                <h1>Users</h1>
                <UserList users={users} />
            </div>
        </div>
    )
}
