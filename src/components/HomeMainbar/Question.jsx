import React from 'react'
import { Link } from 'react-router-dom'

export const Question = ({ question }) => {

  return (
    <div className='display-question-container'>
      <div className='display-votes-ans'>
        <p>{question.question.voteCount}</p>
        <p>votes</p>
      </div>
      <div className='display-votes-ans'>
        <p>{question.question.answers.length}</p>
        <p>answers</p>
      </div>
      <div className='display-question-details'>
        <Link to={`/questions?question-id=${question.question.id}`} className='question-title-link'>{question.question.title}</Link>
        <div className='display-tags-time'>
          <div className='display-tags'>
            {
              question.tags.map((tag) => (
                <p key={tag}>{tag}</p>
              ))
            }
          </div>
          <p className='display-time'>
            posted {question.question.creationDateTime} by {question.question.user}
          </p>
        </div>
      </div>
    </div>
  )
}
