import React from 'react'
import { Link } from 'react-router-dom'

export const Question = ({ question }) => {

  return (
    <div className='display-question-container'>
      <div className='display-votes-ans'>
        <p>{question.voteCount}</p>
        <p>votes</p>
      </div>
      <div className='display-votes-ans'>
        <p>{question.answers.length}</p>
        <p>answers</p>
      </div>
      <div className='display-question-details'>
        <Link to={`/questions/${question.id}`} className='question-title-link'>{question.title}</Link>
        <div className='display-tags-time'>
          <div className='display-tags'>
            {
              question.tags.map((tag) => (
                <p key={tag.id}>{tag.text}</p>
              ))
            }
          </div>
          <p className='display-time'>
            posted {question.creationDateTime} {question.user.username}
          </p>
        </div>
      </div>
    </div>
  )
}
