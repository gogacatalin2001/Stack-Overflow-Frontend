import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Avatar } from '../Avatar/Avatar'
import './Questions.css'
import { deleteAnswer } from '../../actions/answerActions'

export const DisplayAnswers = ({ question }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    var user = useSelector(state => state.userReducer).user
    const userToken = `Bearer ${JSON.parse(localStorage.getItem("User")).token}`

    const handleDeleteAnswer = (e, questionId, answerId) => {
        e.preventDefault()
        dispatch(deleteAnswer({ questionId, answerId }, userToken, navigate))
    }

    return (
        <div className=''>
            {
                question.answers.map((answer) => (
                    <div className='display-ans' key={answer.id}>
                        <p>{answer.text}</p>
                        <div className='question-actions-user'>
                            <div>
                                <button type='button'>Share</button>
                                {
                                    user.userId === answer.user.userId ?
                                        <button type='button' onClick={(e) => handleDeleteAnswer(e, question.id, answer.id)}>Delete</button>
                                        :
                                        <></>
                                }
                            </div>
                            <div>
                                <p>answered {answer.creationDateTime}</p>
                                <Link to={`/users/${answer.user.userId}`} className='user-link' style={{ color: '#0086d8' }}>
                                    <Avatar backgroundColor='green' px='8px' py='8px'>{answer.user.username.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                        {answer.user.username}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
