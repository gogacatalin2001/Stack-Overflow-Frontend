/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'

import { setCurrentUser } from '../../actions/userActions'
import { QuestionList } from './QuestionList'
import { getAllQuestions } from '../../actions/questionActions'
import './HomeMainbar.css'

export const HomeMainbar = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    var user = useSelector(state => state.userReducer).user
    var questions = useSelector(state =>  state.questionReducer)
    const userToken = `Bearer ${JSON.parse(localStorage.getItem("User")).token}`
    
    useEffect(() => {
        dispatch(setCurrentUser(jwtDecode(localStorage.getItem("User"))));
        console.log(user)
        if (user !== null) {
            dispatch(getAllQuestions(userToken))
        } else {
            navigate('/login')
        }
    }, [])

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
                            <p>{questions?.length} questions</p>
                            <QuestionList questionList={questions} />
                        </>
                }
            </div>
        </div>
    )
}
