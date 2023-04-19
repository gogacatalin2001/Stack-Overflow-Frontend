import React from 'react'
import { Link } from 'react-router-dom'

import { Avatar } from '../Avatar/Avatar'
import './Questions.css'

export const DisplayAnswers = ({ question }) => {
    return (
        <div className=''>
            {
                question.answers.map((answer) => (
                    <div className='display-ans' key={answer.id}>
                        <p>{answer.text}</p>
                        <div className='question-actions-user'>
                            <div>
                                <button type='button'>Share</button>
                                <button type='button'>Delete</button>
                            </div>
                            <div>
                                <p>answered {answer.creationDateTime}</p>
                                <Link to={`/users/${answer.user.userId}`} className='user-link' style={{ color: '#0086d8' }}>
                                    <Avatar backgroundColor='green' px='8px' py='8px'>{answer.user.username.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                        {answer.user.username}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
