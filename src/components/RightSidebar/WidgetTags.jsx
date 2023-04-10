import React from 'react'

export const WidgetTags = () => {

  // TODO populate from backend
  const tags = ['c', 'css', 'express', 'firebase', 'java', 'html', 'react', 'spring']

  return (
    <div className='widget-tags'>
      <h4>Watched tags</h4>
      <div className='widget-tags-div'>
        {
          tags.map((tag) => (
            <p key={tag}>{tag}</p>
          ))
        }
      </div>
    </div>
  )
}