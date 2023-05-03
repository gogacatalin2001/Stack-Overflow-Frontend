import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'


import { Avatar } from '../Avatar/Avatar'
import { deleteAnswer } from '../../actions/answerActions'
import upvote from '../../assets/caretup.svg'
import downvote from '../../assets/caretdown.svg'
import './Questions.css'

export const DisplayAnswers = ({ question, handleShare }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    var userToken = localStorage.getItem("User") !== null ? `Bearer ${JSON.parse(localStorage.getItem("User")).token}` : null
    var user = useSelector(state => state.userReducer).user

    // TODO add updateVoteCount for answers

    const handleDeleteAnswer = (e, questionId, answerId) => {
        e.preventDefault()
        dispatch(deleteAnswer({ questionId, answerId }, userToken, navigate))
    }

    return (
        <div className=''>
            {
                question.answers.map((answer) => (
                    <div className='display-ans' key={answer.id}>
                        <div className='votes'>
                            <img className='votes-icon' src={upvote} width='30' alt='upvote' />
                            <p>{answer.voteCount}</p>
                            <img className='votes-icon' src={downvote} width='30' alt='downvote' />
                        </div>
                        <div style={{width: '100%', padding: '15px 5px'}}>
                            <p>{answer.text}</p>
                            <div className='question-actions-user'>
                                <div>
                                    <button type='button' onClick={handleShare} >Share</button>
                                    {
                                        user !== null && user.userId === answer.user.userId ?
                                            <>
                                                <button type='button' onClick={(e) => handleDeleteAnswer(e, question.id, answer.id)}>Delete</button>
                                            </>
                                            :
                                            <></>
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
                ))
            }
        </div>
    )
}
