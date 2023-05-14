import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllTags } from '../../actions/tagActions'
import './RightSidebar.css'

export const WidgetTags = () => {

  const dispatch = useDispatch()
  var tags = useSelector(state => state.tagReducer.tags).slice(0, 10)

  useEffect(() => {
    dispatch(getAllTags())
  }, [])
  
  return (
    <div className='widget-tags'>
      <h4>Watched tags</h4>
      <div className='widget-tags-div'>
        {
          tags.map(tag => (
            <p key={tag.id}>{tag.text} </p>
          ))
        }
      </div>
    </div>
  )
}