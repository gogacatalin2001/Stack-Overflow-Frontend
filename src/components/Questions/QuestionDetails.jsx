import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { Avatar } from '../Avatar/Avatar'
import { DisplayAnswers } from './DisplayAnswers'

import upvote from '../../assets/caretup.svg'
import downvote from '../../assets/caretdown.svg'
import './Questions.css'

export const QuestionDetails = () => {

    const { id } = useParams()


    var questions = [
        {
            id: '1',
            title: 'Question 1',
            text: 'Is this the first question?',
            imageData: null,
            voteCount: 0,
            userId: 1,
            creationDateTime: 'today',
            answers: [
                {
                    id: '2',
                    text: 'This is the first answer',
                    imageData: null,
                    voteCount: 0,
                    userId: 1,
                    creationDateTime: 'today',
                }
            ],
            tags: ['tag1', 'tag2']
        },
        {
            id: '2',
            title: 'Question 2',
            text: 'Is this the first question or not?',
            imageData: null,
            voteCount: 0,
            userId: 1,
            creationDateTime: 'yesterday',
            answers: [],
            tags: ['tag1', 'tag3']
        },

        {
            id: '3',
            title: 'Question 3',
            text: 'How do you even add security to this app?',
            imageData: null,
            voteCount: 0,
            userId: 2,
            creationDateTime: 'now',
            answers: [],
            tags: ['security']
        },
        {
            id: '4',
            title: 'Question 4',
            text: 'How to detect license plates using OpenCV C++?',
            imageData: null,
            voteCount: 0,
            userId: 1,
            creationDateTime: 'now',
            answers: [],
            tags: ['OpenCV', 'C++']
        }
    ]

    return (
        <div className='question-details-page'>
            {
                questions === null ?
                    <h1>Loading...</h1> :
                    <>
                        {
                            questions.filter(question => question.id === id).map(question => (
                                <div key={question?.id}>
                                    <section className='question-details-container-1'>
                                        <h1>{question?.title}</h1>
                                        <div className='question-details-container-2'>
                                            <div className='question-votes'>
                                                <img className='votes-icon' src={upvote} width='30' alt='upvote' />
                                                <p>{question?.voteCount}</p>
                                                <img className='votes-icon' src={downvote} width='30' alt='downvote' />
                                            </div>
                                            <div style={{ width: '100' }}>
                                                <p className='question-body'>{question?.text}</p>
                                                <div className='question-details-tags'>
                                                    {
                                                        question.tags.map((tag) => (
                                                            <p key={tag}>{tag}</p>
                                                        ))
                                                    }
                                                </div>
                                                <div className='question-actions-user'>
                                                    <div>
                                                        <button type='button'>Share</button>
                                                        <button type='button'>Delete</button>
                                                    </div>
                                                    <div>
                                                        <p>asked {question.creationDateTime}</p>
                                                        <Link to={`/users/${question.userId}`} className='user-link' style={{ color: '#0086d8' }}>
                                                            <Avatar backgroundColor='orange' px='8px' py='8px'>C{/* TODO ADD USER INITIAL */}</Avatar>
                                                            <div>
                                                                Catalin
                                                                {/* {question.userId} */}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    {
                                        question.answers.length !== 0 && (
                                            <section>
                                                <h3>{question.answers.length} answers</h3>
                                                <DisplayAnswers key={question.id} question={question} />
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
                                                question.tags.map((tag) => (
                                                    <Link to='/tags' key={tag} className='ans-tags'> {tag} </Link>
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
