/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'

import { QuestionList } from './QuestionList'
import { getAllQuestions, getFilteredQuestions } from '../../actions/questionActions'
import { setCurrentUser } from '../../actions/userActions'
import './HomeMainbar.css'

export const HomeMainbar = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [filterValue, setFilterValue] = useState('user')
    const [filter, setFilter] = useState('username')

    const user = useSelector(state => state.userReducer.user)
    const questions = useSelector(state => state.questionReducer.questions)
    const token = localStorage.getItem("Token")

    useEffect(() => {
        dispatch(getAllQuestions())
    }, [])

    useEffect(() => {
        dispatch(setCurrentUser(token !== null ? JSON.stringify(jwtDecode(token)) : null))
    }, [dispatch])

    const ownQuestionsFilter = () => {
        setFilter('own')
        setFilterValue(user.username)
    }

    const filterQuestions = () => {
        dispatch(getFilteredQuestions({ type: filter, value: filterValue }))
    }

    const clearFilters = () => {
        setFilter('username')
        setFilterValue('user')
        dispatch(getAllQuestions())
    }

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
            <div className='main-bar-header'>
                <div>
                    <input type='text' placeholder='Enter filter here...' onChange={e => setFilterValue(e.target.value)} />
                    Username <input type='radio' value='username' checked={filter === 'username'} onChange={e => setFilter(e.target.value)} />
                    Title <input type='radio' value='title' checked={filter === 'title'} onChange={e => setFilter(e.target.value)} />
                    Tag <input type='radio' value='tag' checked={filter === 'tag'} onChange={e => setFilter(e.target.value)} />
                    {
                        user &&
                        <>
                            Own questions <input type='radio' value='own' checked={filter === 'own'} onChange={ownQuestionsFilter} />
                        </>
                    }
                </div>
                <button onClick={filterQuestions} className='ask-btn'>Filter questions</button>
                <button onClick={clearFilters} className='ask-btn'>Clear filters</button>
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
