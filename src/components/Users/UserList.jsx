import React from 'react'

import { Link } from 'react-router-dom'
import '../../pages/Users/Users.css'

export const UserList = ({ users }) => {
    return (
        <div className='user-list-container'>
            {
                users.map(user => (
                    <div key={user.userId}>
                        <Link to={`/users/${user.userId}`} className='user-profile-link'>
                            <h3>{user.username.charAt(0).toUpperCase()}</h3>
                            <h5>{user.username}</h5>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}
