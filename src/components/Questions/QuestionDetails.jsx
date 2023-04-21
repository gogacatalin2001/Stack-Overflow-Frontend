import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Avatar } from '../Avatar/Avatar'
import { DisplayAnswers } from './DisplayAnswers'
import { getAllQuestions } from '../../actions/questionActions'

import upvote from '../../assets/caretup.svg'
import downvote from '../../assets/caretdown.svg'
import './Questions.css'

export const QuestionDetails = () => {

    const { id } = useParams()

    const dispatch = useDispatch()

    var questions = useSelector(state =>  state.questionReducer)
   

    useEffect(() => {
        // dispatch(setCurrentUser(jwtDecode(localStorage.getItem('User'))))
        dispatch(getAllQuestions())
    }, [])


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
                                            <div className='question-votes'>
                                                <img className='votes-icon' src={upvote} width='30' alt='upvote' />
                                                <p>{wrapper.question.voteCount}</p>
                                                <img className='votes-icon' src={downvote} width='30' alt='downvote' />
                                            </div>
                                            <div style={{ width: '100' }}>
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
                                                        <button type='button'>Share</button>
                                                        <button type='button'>Delete</button>
                                                    </div>
                                                    <div>
                                                        <p>asked {wrapper.question.creationDateTime}</p>
                                                        <Link to={`/users/${wrapper.question.user.userId}`} className='user-link' style={{ color: '#0086d8' }}>
                                                            <Avatar backgroundColor='orange' px='8px' py='8px'>{wrapper.question.user.username.charAt(0).toUpperCase()}</Avatar>
                                                            <div>
                                                                {wrapper.question.user.username}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    {
                                        wrapper.question.answers.length !== 0 && (
                                            <section>
                                                <h3>{wrapper.question.answers.length} answers</h3>
                                                <DisplayAnswers key={wrapper.question.id} question={wrapper.question} />
                                            </section>
                                        )
                                    }
                                    <section className='post-ans-container'>
                                        <h3>Your answer</h3>
                                        <form >
                                            <textarea name='' id='' cols='30' rows='10'></textarea><br />
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
