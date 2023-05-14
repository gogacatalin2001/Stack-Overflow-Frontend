/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import { setCurrentUser } from '../../actions/userActions'
import { getAllQuestions, updateQuestion } from '../../actions/questionActions'
import './AskQuestion.css'

export const EditQuestion = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const questions = useSelector(state => state.questionReducer.questions)
    const wrapper = questions.filter(wrapper => wrapper.question.id.toString() === id)
    var question = wrapper[0]?.question
    var tags = wrapper[0]?.tags
    var user = useSelector(state => state.userReducer.user)
    var token = localStorage.getItem("Token")
    var userToken = token ? `Bearer ${JSON.parse(token).token}` : null

    const [questionTitle, setQuestionTitle] = useState('')
    const [questionBody, setQuestionBody] = useState('')
    const [questionTags, setQuestionTags] = useState([])

    useEffect(() => {
        dispatch(getAllQuestions())
        document.getElementById('ask-ques-title').value = question?.title
        document.getElementById('ask-ques-body').value = question?.text
        document.getElementById('ask-ques-tags').value = tags?.map(tag => tag.text)
        if (question?.title !== null) {
            setQuestionTitle(question.title) 
        }
        if (question?.text !== null) {
            setQuestionBody(question.text) 
        }
        if (tags !== null) {
            setQuestionTags(tags) 
        }
    }, [])
    
    useEffect(() => {
        dispatch(setCurrentUser(token !== null ? JSON.stringify(jwtDecode(token)) : null))
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (user !== null) {
            question.title = questionTitle
            question.text = questionBody
            // TODO set question image
            tags = questionTags
            dispatch(updateQuestion(
                {
                    question,
                    tags
                },
                userToken,
                navigate
            ))
        } else {
            navigate('/auth/login')
        }
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setQuestionBody(questionBody + "\n")
        }
    }

    return (
        <div className='ask-question'>
            <div className='ask-ques-container'>
                <h1>Edit Question</h1>
                <form onSubmit={handleSubmit}>
                    <div className='ask-form-container'>
                        <label htmlFor='ask-ques-title'>
                            <h4>Title</h4>
                            <p>Be specific and imagine you're asking a question to another person.</p>
                            <input type='text' id='ask-ques-title' placeholder='e.g. Is there an R fuction for finding the index of an element in a vector?' onChange={(e) => setQuestionTitle(e.target.value)} />
                        </label>
                        <label htmlFor='ask-ques-body'>
                            <h4>What are the details of your problem?</h4>
                            <p>Introduce the problem and expand in what you put in the title. Minimum 20 characters.</p>
                            <textarea name='' id='ask-ques-body' cols='30' rows='10' onKeyDown={handleEnter} onChange={(e) => setQuestionBody(e.target.value)}></textarea>
                        </label>
                        <label htmlFor='ask-ques-tags'>
                            <h4>Tags</h4>
                            <p>Add up to 5 tags to describe what your question is about. Start typing to se suggestions.</p>
                            <input type='text' id='ask-ques-tags' placeholder='e.g. (excel iphone flutter)' onChange={(e) => setQuestionTags(e.target.value.split(' '))} />
                        </label>
                        <input id='upload-image' name ='image' type='file' />
                    </div>
                    <input className='review-btn' type='submit' value='Review your question' />
                </form>
            </div>
        </div>
    )
}
