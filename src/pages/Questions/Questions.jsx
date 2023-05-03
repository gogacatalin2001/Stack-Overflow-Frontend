import React from 'react'

import { LeftSidebar } from '../../components/LeftSidebar/LeftSidebar'
import { HomeMainbar } from '../../components/HomeMainbar/HomeMainbar'
import { RightSidebar } from '../../components/RightSidebar/RightSidebar'
import '../../App.css';


export const Questions = () => {
  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className='home-container-2'>
        {/* TODO add question filtering by: tags, title, author*/}
        <HomeMainbar />
        <RightSidebar />
      </div>
    </div>
  )
}
