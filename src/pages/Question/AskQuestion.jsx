/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import { setCurrentUser } from '../../actions/userActions'
import { postQuestion } from '../../actions/questionActions'
import './AskQuestion.css'

export const AskQuestion = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    var user = useSelector(state => state.userReducer.user)
    var token = localStorage.getItem("Token")
    var userToken = token ? `Bearer ${JSON.parse(token).token}` : null

    useEffect(() => {
        dispatch(setCurrentUser(token !== null ? JSON.stringify(jwtDecode(token)) : null))
    }, [dispatch])

    const [questionTitle, setQuestionTitle] = useState('')
    const [questionBody, setQuestionBody] = useState('')
    const [questionTags, setQuestionTags] = useState([''])
    const [questionImage, setQuestionImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (user !== null) {
            dispatch(postQuestion(
                {
                    question: { title: questionTitle, text: questionBody },
                    tags: questionTags,
                    image: questionImage,
                    userId: user.userId
                },
                userToken,
                navigate))
        } else {
            navigate('/auth/login')
        }
    }

    const handleUploadImage = (file) => {
        setImagePreview(URL.createObjectURL(file))
        let imageData = new FormData();
        imageData.append("image", file)
        setQuestionImage(imageData)
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setQuestionBody(questionBody + "\n")
        }
    }

    return (
        <div className='ask-question'>
            <div className='ask-ques-container'>
                <h1>Ask a public Question</h1>
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
                        <div>
                            <input id='upload-image' name='image' type='file' accept='image/*' onChange={(e) => handleUploadImage(e.target.files[0])} />
                            {imagePreview && <img alt='preview' src={imagePreview} width='300' />}
                        </div>
                    </div>
                    <input className='review-btn' type='submit' value='Review your question' />
                </form>
            </div>
        </div>
    )
}
