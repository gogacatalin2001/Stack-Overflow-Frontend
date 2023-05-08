/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment/moment'
import copy from 'copy-to-clipboard'
import jwtDecode from 'jwt-decode'

import { Avatar } from '../Avatar/Avatar'
import { DisplayAnswers } from './DisplayAnswers'
import { deleteQuestion, getAllQuestions } from '../../actions/questionActions'
import { postAnswer } from '../../actions/answerActions'
import { updateQuestionVotes } from '../../actions/questionActions'

import upvote from '../../assets/caretup.svg'
import downvote from '../../assets/caretdown.svg'
import './Questions.css'
import { setCurrentUser } from '../../actions/userActions'


export const QuestionDetails = () => {

    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const baseURL = 'http://localhost:3000'
    const [answerText, setAnswerText] = useState('')

    var questions = useSelector(state => state.questionReducer.questions)
    var user = useSelector(state => state.userReducer.user)
    var token = localStorage.getItem("Token")
    var userToken = `Bearer ${JSON.parse(token).token}`

    useEffect(() => {
        dispatch(getAllQuestions())
    }, [])

    useEffect(() => {
        dispatch(setCurrentUser(token !== null ? JSON.stringify(jwtDecode(token)) : null))
    }, [dispatch])

    const handleUpdateQuestion = () => {
        // TODO implement
    }

    const handlePostAnswer = (e, questionId) => {
        e.preventDefault()   
        if (user === null) {
            navigate('/login')
        } else {
            if (answerText === '') {
                alert("Your answer cannot be empty")
            } else {
                dispatch(postAnswer({ questionId, userId: user.userId, answerText }, userToken, navigate))
            }
        }
    }

    const handleDeleteQuestion = (e, questionId) => {
        e.preventDefault()
        if (user === null) {
            navigate('/login')
        } else {
            dispatch(deleteQuestion(questionId, userToken, navigate))
        }
    }

    const handleVote = (e, questionId, vote) => {
        console.log(user)
        e.preventDefault()
        if (user === null) {
            navigate('/login')
        } else {
            dispatch(updateQuestionVotes({ questionId, userId: user.userId, vote }, userToken, navigate))
        }
    }

    const handleShare = () => {
        copy(baseURL + location.pathname)
        console.log(baseURL + location.pathname)
        alert('Copied to clipboard')
    }

    return (
        <div className='question-details-page'>
            {
                questions === null ?
                    <h1>Loading...</h1> :
                    <>
                        {
                            questions.filter(wrapper => wrapper.question.id.toString() === id).map(wrapper => (
                                <div key={wrapper.question.id}>
                                    <section className='question-details-container-1'>
                                        <h1>{wrapper.question.title}</h1>
                                        <div className='question-details-container-2'>
                                            <div className='votes'>
                                                <img src={upvote} onClick={(e) => handleVote(e, wrapper.question.id, "1")} className='votes-icon' width='30' alt='upvote' />
                                                <p>{wrapper.question.voteCount}</p>
                                                <img src={downvote} onClick={(e) => handleVote(e, wrapper.question.id, "-1")} className='votes-icon' width='30' alt='downvote' />
                                            </div>
                                            <div style={{ width: '100%' }}>
                                                <p className='question-body'>{wrapper.question.text}</p>
                                                <div className='question-details-tags'>
                                                    {
                                                        wrapper.tags.map((tag) => (
                                                            <p key={tag.id}>{tag.text}</p>
                                                        ))
                                                    }
                                                </div>
                                                <div className='question-actions-user'>
                                                    <div>
                                                        <button type='button' onClick={handleShare} >Share</button>
                                                        {
                                                            user !== null && user?.userId === wrapper.question.user.userId ?
                                                                <>
                                                                    <button type='button' onClick={(e) => handleDeleteQuestion(e, wrapper.question.id)}>Delete</button>
                                                                </>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                    <div className='user-details'>
                                                        <Link to={`/users/${wrapper.question.user.userId}`} className='user-link' style={{ color: '#0086d8' }}>
                                                            <Avatar backgroundColor='orange' px='8px' py='8px'>
                                                                {wrapper.question.user.username.charAt(0).toUpperCase()}
                                                            </Avatar>
                                                            <div>
                                                                {wrapper.question.user.username}
                                                            </div>
                                                        </Link>
                                                        <p style={{ fontWeight: 'bold' }}>{wrapper.question.user.score}</p>
                                                        <p>asked {moment(wrapper.question.creationDateTime).fromNow()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    {
                                        wrapper.question.answers.length !== 0 && (
                                            <section>
                                                <h3>{wrapper.question.answers.length} answers</h3>
                                                <DisplayAnswers key={wrapper.question.id} question={wrapper.question} handleShare={handleShare} />
                                            </section>
                                        )
                                    }
                                    <section className='post-ans-container'>
                                        <h3>Your answer</h3>
                                        <form onSubmit={(e) => handlePostAnswer(e, wrapper.question.id)} >
                                            <textarea name='' id='' cols='30' rows='10' placeholder='Enter your answer here' onChange={(e) => setAnswerText(e.target.value)} ></textarea><br />
                                            <input className='post-ans-btn' type='submit' value='Post Your Answer' />
                                        </form>
                                        <p>
                                            Browse other questions tagged
                                            {
                                                wrapper.tags.map((tag) => (
                                                    <Link to='/tags' key={tag.id} className='ans-tags'> {tag.text} </Link>
                                                ))
                                            }
                                            or
                                            <Link to='/questions/ask-question' style={{ textDecoration: 'none', color: '#009dff' }}> ask your own question.</Link>
                                        </p>
                                    </section>
                                </div>
                            ))
                        }
                    </>
            }

        </div>
    )
}
