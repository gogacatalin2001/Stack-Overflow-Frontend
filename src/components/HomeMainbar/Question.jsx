import React from 'react'
import { Link } from 'react-router-dom'

export const Question = ({ wrapper }) => {

  return (
    <div className='display-question-container'>
      <div className='display-votes-ans'>
        <p>{wrapper.question.voteCount}</p>
        <p>votes</p>
      </div>
      <div className='display-votes-ans'>
        <p>{wrapper.question.answers.length}</p>
        <p>answers</p>
      </div>
      <div className='display-question-details'>
        <Link to={`/questions/${wrapper.question.id}`} className='question-title-link'>{wrapper.question.title}</Link>
        <div className='display-tags-time'>
          <div className='display-tags'>
            {
              wrapper.tags.map((tag) => (
                <p key={tag.id}>{tag.text}</p>
              ))
            }
          </div>
          <p className='display-time'>
            posted {wrapper.question.creationDateTime} {wrapper.question.user.username}
          </p>
        </div>
      </div>
    </div>
  )
}
