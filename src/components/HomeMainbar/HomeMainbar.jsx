/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'

import { QuestionList } from './QuestionList'
import { getAllQuestions } from '../../actions/questionActions'
import { setCurrentUser } from '../../actions/userActions'
import './HomeMainbar.css'

export const HomeMainbar = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.userReducer.user)
    const questions = useSelector(state => state.questionReducer.questions)
    const token = localStorage.getItem("Token")

    useEffect(() => {
        dispatch(getAllQuestions())
    }, [])

    useEffect(() => {
        dispatch(setCurrentUser(token !== null ? JSON.stringify(jwtDecode(token)) : null))
    }, [dispatch])


    const askQuestion = () => {
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
                <button onClick={askQuestion} className='ask-btn'>Ask Question</button>
            </div>
            <div>
                {
                    questions === null ?
                        <h1>Loading...</h1> :
                        <>
                            <p>{questions?.length} questions</p>
                            <QuestionList questionList={questions} />
                        </>
                }
            </div>
        </div>
    )
}
