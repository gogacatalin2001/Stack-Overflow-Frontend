/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import { LeftSidebar } from '../../components/LeftSidebar/LeftSidebar'
import { TagList } from '../../components/Tags/TagList'
import { getAllTags } from '../../actions/tagActions'
import { useDispatch, useSelector } from 'react-redux'

import './Tags.css'

export const Tags = () => {

    const dipatch = useDispatch()
    var tags = useSelector(state => state.tagReducer.tags)
    
    useEffect(() => {
        dipatch(getAllTags())
    }, [])

    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className='home-container-2'>
                <h1>Tags</h1>
                <p>A tag is a keyword or label that categorizes your question with other, similar questions.</p>
                <p>Using the right that makes it easier for others to find and answer your qustion.</p>
                <div>
                    <TagList tags={tags} />
                </div>
            </div>
        </div>
    )
}

