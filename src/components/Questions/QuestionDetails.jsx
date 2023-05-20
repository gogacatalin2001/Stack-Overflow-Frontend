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
import { deleteQuestion, getQuestion } from '../../actions/questionActions'
import { postAnswer, updateAnswer } from '../../actions/answerActions'
import { updateQuestionVotes } from '../../actions/questionActions'
import { setCurrentUser } from '../../actions/userActions'

import upvote from '../../assets/caretup.svg'
import downvote from '../../assets/caretdown.svg'
import './Questions.css'


export const QuestionDetails = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const baseURL = 'http://localhost:3000'
    const [answerText, setAnswerText] = useState('')
    const [answerToUpdate, setAnswerToUpdate] = useState(null)
    const [answerImage, setAnswerImage] = useState(null)
    const [answerImagePreview, setAnswerImagePreview] = useState(null)
    const [question, setQuestion] = useState(null)
    const [tags, setTags] = useState([])

    const user = useSelector(state => state.userReducer.user)
    const token = localStorage.getItem("Token")
    const userToken = token ? `Bearer ${JSON.parse(token).token}` : null

    useEffect(() => {
        dispatch(getQuestion(id))
        const wrapper = JSON.parse(localStorage.getItem("Question"))
        setQuestion(wrapper.question)
        setTags(wrapper.tags)
    }, [])

    useEffect(() => {
        dispatch(setCurrentUser(token !== null ? JSON.stringify(jwtDecode(token)) : null))
    }, [dispatch])

    const handleUploadImage = (file) => {
        setAnswerImagePreview(URL.createObjectURL(file))
        const image = new FormData()
        image.append("image", file)
        setAnswerImage(image)
    }

    const handleUpdateQuestion = (e, questionId) => {
        e.preventDefault()
        if (user === null) {
            navigate('/login')
        } else {
            navigate(`/questions/edit-question/${questionId}`)
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

    const handlePostAnswer = (e, questionId) => {
        e.preventDefault()
        if (user === null) {
            navigate('/login')
        } else {
            if (answerText === '') {
                document.getElementById('answer-text').placeholder = "Your answer cannot be empty"
            } else {
                if (answerToUpdate !== null) {
                    answerToUpdate.text = answerText
                    dispatch(updateAnswer({ answer: answerToUpdate, image: answerImage, questionId, userId: user.userId }, userToken, navigate))
                } else {
                    setAnswerToUpdate(null)
                    dispatch(postAnswer({ questionId, image: answerImage, userId: user.userId, answerText }, userToken, navigate))
                }
            }
        }
    }

    const handleUpdateAnswer = (answer) => {
        setAnswerToUpdate(answer)
        document.getElementById('answer-text').value = answer.text
    }

    const handleVote = (e, questionId, vote) => {
        e.preventDefault()
        if (user === null) {
            navigate('/login')
        } else {
            dispatch(updateQuestionVotes({ questionId, userId: user.userId, vote }, userToken, navigate))
        }
    }

    const handleShare = () => {
        copy(baseURL + location.pathname)
        alert('Copied to clipboard')
    }

    return (
        <div className='question-details-page'>
            {
                question === null ?
                    <h1>Loading...</h1> :
                    <>
                        <div key={question.id}>
                            <section className='question-details-container-1'>
                                <h1>{question.title}</h1>
                                <div className='question-details-container-2'>
                                    <div className='votes'>
                                        <img src={upvote} onClick={e => handleVote(e, question.id, "1")} className='votes-icon' width='30' alt='upvote' />
                                        <p>{question.voteCount}</p>
                                        <img src={downvote} onClick={e => handleVote(e, question.id, "-1")} className='votes-icon' width='30' alt='downvote' />
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <p className='question-body'>{question.text}</p>
                                        {question.image && <img src={question.image.imageData} width='300' alt="" />}
                                        <div className='question-details-tags'>
                                            {
                                                tags.map(tag => <p key={tag.id}>{tag.text}</p>)
                                            }
                                        </div>
                                        <div className='question-actions-user'>
                                            <div>
                                                <button type='button' onClick={handleShare} >Share</button>
                                                {
                                                    user !== null && (user.userId === question.user.userId || user.role === "MODERATOR") &&
                                                    <>
                                                        <button type='button' onClick={e => handleUpdateQuestion(e, question.id)}>Edit</button>
                                                        <button type='button' onClick={e => handleDeleteQuestion(e, question.id)}>Delete</button>
                                                    </>
                                                }
                                            </div>
                                            <div className='user-details'>
                                                <Link to={`/users/${question.user.userId}`} className='user-link' style={{ color: '#0086d8' }}>
                                                    <Avatar backgroundColor='orange' px='8px' py='8px'>
                                                        {question.user.username.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                    <div>
                                                        {question.user.username}
                                                    </div>
                                                </Link>
                                                <p style={{ fontWeight: 'bold' }}>{question.user.score}</p>
                                                <p>asked {moment(question.creationDateTime).fromNow()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {
                                question.answers.length !== 0 &&
                                <section>
                                    <h3>{question.answers.length} answers</h3>
                                    {question.answers.map(answer => (
                                        <DisplayAnswers key={answer.id} answer={answer} questionId={question.id} handleShare={handleShare} handleUpdateAnswer={handleUpdateAnswer} />
                                    ))}

                                </section>

                            }
                            <section className='post-ans-container'>
                                <h3>Your answer</h3>
                                <form onSubmit={e => handlePostAnswer(e, question.id)} >
                                    <textarea id='answer-text' cols='30' rows='10' placeholder='Enter your answer here' onChange={(e) => setAnswerText(e.target.value)} />
                                    <br />
                                    <div>
                                        {
                                            answerImagePreview && <img alt='preview' src={answerImagePreview} width='350' />
                                        }
                                        <br />
                                        <input type='file' id="image" onChange={e => handleUploadImage(e.target.files[0])} />
                                        <br />
                                        <input className='post-ans-btn' type='submit' value='Post Your Answer' />
                                    </div>
                                </form>
                                <p>
                                    Browse other questions tagged
                                    {
                                        tags.map(tag =>
                                            <Link to='/tags' key={tag.id} className='ans-tags'> {tag.text} </Link>
                                        )
                                    }
                                    or
                                    <Link to='/questions/ask-question' style={{ textDecoration: 'none', color: '#009dff' }}> ask your own question.</Link>
                                </p>
                            </section>
                        </div>
                    </>
            }

        </div>
    )
}
