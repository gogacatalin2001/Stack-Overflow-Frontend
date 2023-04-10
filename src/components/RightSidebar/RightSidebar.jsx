import React from 'react'

import { Widget } from './Widget'
import { WidgetTags } from './WidgetTags'
import './RightSidebar.css'

export const RightSidebar = () => {
  return (
    <div className='right-sidebar'>
      <Widget />
      <WidgetTags />
    </div>
  )
}
