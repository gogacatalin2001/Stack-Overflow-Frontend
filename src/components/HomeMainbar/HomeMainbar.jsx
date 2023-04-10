import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { QuestionList } from './QuestionList'
import './HomeMainbar.css'

export const HomeMainbar = () => {

    // TODO get questions from backend
    // TODO model the question by the backend data format
    var questions = [
        {
            id: 1,
            title: "Question 1",
            text: "Is this the first question?",
            imageData: null,
            voteCount: 0,
            userId: 1,
            creationDateTime: "today",
            answers: [],
            tags: ["tag1", "tag2"]
        },
        {
            id: 2,
            title: "Question 2",
            text: "Is this the first question or not?",
            imageData: null,
            voteCount: 0,
            userId: 1,
            creationDateTime: "yesterday",
            answers: [],
            tags: ["tag1", "tag3"]
        },

        {
            id: 3,
            title: "Question 3",
            text: "How do you even add security to this app?",
            imageData: null,
            voteCount: 0,
            userId: 2,
            creationDateTime: "now",
            answers: [],
            tags: ["security"]
        },
        {
            id: 4,
            title: "Question 4",
            text: "How to detect license plates using OpenCV C++?",
            imageData: null,
            voteCount: 0,
            userId: 1,
            creationDateTime: "now",
            answers: [],
            tags: ["OpenCV", "C++"]
        }
    ]

    const user = 1;

    const location = useLocation()
    const navigate = useNavigate();

    const checkUserAuth = () => {
        if (user === null) {
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
