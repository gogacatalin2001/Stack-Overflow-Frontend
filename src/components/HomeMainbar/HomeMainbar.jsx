import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { QuestionList } from './QuestionList'
import './HomeMainbar.css'

export const HomeMainbar = () => {

    // TODO get questions from backend
    // TODO model the question by the backend data format
    var questions = [
        {
            id: 11,
            text: "Testing",
            imageURL: null,
            creationDateTime: "2023-04-09T21:37:18.751787",
            voteCount: 0,
            user: {
                userId: 1,
                username: "user",
                email: "user@gmail.com",
                password: "$2a$10$brigwnefzBq5fk9RDAJWguYvxGyeJTUVOfKPjWFc4OwDuOENq6u7C",
                phoneNumber: "0750036695",
                score: 0,
                banned: false,
                role: "USER",
                enabled: true,
                authorities: [
                    {
                        authority: "USER"
                    }
                ],
                credentialsNonExpired: true,
                accountNonExpired: true,
                accountNonLocked: true
            },
            title: "Question 1",
            answers: [
                {
                    id: 12,
                    text: "Is it working?",
                    imageURL: null,
                    creationDateTime: "2023-04-09T21:37:38.079583",
                    voteCount: 0,
                    user: {
                        userId: 1,
                        username: "user",
                        email: "user@gmail.com",
                        password: "$2a$10$brigwnefzBq5fk9RDAJWguYvxGyeJTUVOfKPjWFc4OwDuOENq6u7C",
                        phoneNumber: "0750036695",
                        score: 0,
                        banned: false,
                        role: "USER",
                        enabled: true,
                        authorities: [
                            {
                                authority: "USER"
                            }
                        ],
                        credentialsNonExpired: true,
                        accountNonExpired: true,
                        accountNonLocked: true
                    }
                },
                {
                    id: 13,
                    text: "I gues now it is working",
                    imageURL: null,
                    creationDateTime: "2023-04-09T21:39:40.960797",
                    voteCount: 0,
                    user: {
                        userId: 2,
                        username: "admin",
                        email: "admin@gmail.com",
                        password: "$2a$10$tDZUpHK1RQC37ZiUlJsvYeLWLcZ46UcnidxEA2k.27OeccVVoB7WW",
                        phoneNumber: "0750036696",
                        score: 0,
                        banned: false,
                        role: "MODERATOR",
                        enabled: true,
                        authorities: [
                            {
                                "authority": "MODERATOR"
                            }
                        ],
                        credentialsNonExpired: true,
                        accountNonExpired: true,
                        accountNonLocked: true
                    }
                },
                {
                    id: 14,
                    text: "It should be better now",
                    imageURL: null,
                    creationDateTime: "2023-04-09T22:10:44.190344",
                    voteCount: 0,
                    user: {
                        userId: 2,
                        username: "admin",
                        email: "admin@gmail.com",
                        password: "$2a$10$tDZUpHK1RQC37ZiUlJsvYeLWLcZ46UcnidxEA2k.27OeccVVoB7WW",
                        phoneNumber: "0750036696",
                        score: 0,
                        banned: false,
                        role: "MODERATOR",
                        enabled: true,
                        authorities: [
                            {
                                authority: "MODERATOR"
                            }
                        ],
                        credentialsNonExpired: true,
                        accountNonExpired: true,
                        accountNonLocked: true
                    }
                }
            ],
            tags: [
                {
                    id: 1,
                    text: "tag1"
                }
            ]
        }
    ]


    const User = useSelector((state) => state.currentUserReducer)

    const location = useLocation()
    const navigate = useNavigate();

    const checkUserAuth = () => {
        if (User === null) {
            navigate('/login')
        } else {
            navigate('/questions/ask-question')
        }
    }

    return (
        <div className='main-bar'>
            <div className='main-bar-header'>
                {
                    location.pathname === '/' ?
                        <h1>Top Questions</h1> : <h1>All Questions</h1>
                }
                <button onClick={checkUserAuth} className='ask-btn'>Ask Question</button>
            </div>
            <div>
                {
                    questions === null ?
                        <h1>Loading...</h1> :
                        <>
                            <p>{questions.length} questions</p>
                            <QuestionList questionList={questions} />
                        </>
                }
            </div>
        </div>
    )
}
