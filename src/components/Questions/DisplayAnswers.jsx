/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import moment from 'moment'
import jwtDecode from 'jwt-decode'

import { Avatar } from '../Avatar/Avatar'
import { deleteAnswer, updateAnswerVotes } from '../../actions/answerActions'
import { setCurrentUser } from '../../actions/userActions'
import { getImageData } from '../../actions/imageActions'
import upvote from '../../assets/caretup.svg'
import downvote from '../../assets/caretdown.svg'
import './Questions.css'

export const DisplayAnswers = ({ answer, questionId, handleUpdateAnswer, handleShare }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.userReducer.user)
    const token = localStorage.getItem("Token")
    const userToken = token ? `Bearer ${JSON.parse(token).token}` : null
    const image = useSelector(state => state.imageReducer.image)
    const [answerImage, setAnswerImage] = useState(null)


    useEffect(() => {
        getImage(answer.image.id, answer.image.type)
    }, [])

    useEffect(() => {
        dispatch(setCurrentUser(token !== null ? JSON.stringify(jwtDecode(token)) : null))
    }, [dispatch])

    const handleVote = (e, answerId, vote) => {
        e.preventDefault()
        if (user === null) {
            navigate('/login')
        } else {
            dispatch(updateAnswerVotes({ questionId: questionId, answerId, userId: user.userId, vote }, userToken, navigate))
        }
    }

    const handleDeleteAnswer = (e, answerId) => {
        e.preventDefault()
        if (user === null) {
            navigate('/login')
        } else {
            dispatch(deleteAnswer({ questionId: questionId, answerId, userId: user.userId }, userToken, navigate))
        }
    }

    const getImage = (imageId, imageType) => {
        if (imageId !== null && imageType !== null) {
            dispatch(getImageData(imageId))
            setAnswerImage("data:" + imageType + ";base64," + image)
        }
    }

    return (
        <div className=''>
            <div className='display-ans' key={answer.id}>
                <div className='votes'>
                    <img className='votes-icon' onClick={e => handleVote(e, answer.id, "1")} src={upvote} width='30' alt='upvote' />
                    <p>{answer.voteCount}</p>
                    <img className='votes-icon' onClick={e => handleVote(e, questionId, answer.id, "-1")} src={downvote} width='30' alt='downvote' />
                </div>
                <div style={{ width: '100%', padding: '15px 5px' }}>
                    <p>{answer.text}</p>
                    {answerImage && <img src={answerImage} width='300' alt="" />}
                    <div className='question-actions-user'>
                        <div>
                            <button type='button' onClick={handleShare} >Share</button>
                            {
                                user !== null && user.userId === answer.user.userId &&
                                <>
                                    <button type='button' onClick={e => handleUpdateAnswer(answer)}>Edit</button>
                                    <button type='button' onClick={e => handleDeleteAnswer(e, answer.id)}>Delete</button>
                                </>
                            }
                        </div>
                        <div className='user-details'>
                            <Link to={`/users/${answer.user.userId}`} className='user-link' style={{ color: '#0086d8' }}>
                                <Avatar backgroundColor='green' px='8px' py='8px'>
                                    {answer.user.username.charAt(0).toUpperCase()}
                                </Avatar>
                                <div>
                                    {answer.user.username}
                                </div>
                            </Link>
                            <p style={{ fontWeight: 'bold' }}>{answer.user.score}</p>
                            <p>answered {moment(answer.creationDateTime).fromNow()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
