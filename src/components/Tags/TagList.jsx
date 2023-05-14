import React from 'react'

import '../../pages/Tags/Tags.css'

export const TagList = ({ tags }) => {
  return (
    <div className='tag-list-container'>
      {
        tags.map(tag => (
          <h5 key={tag.id}>{tag.text}</h5>
        ))
      }
    </div>
  )
}
