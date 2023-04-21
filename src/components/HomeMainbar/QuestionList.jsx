import React from 'react'

import { Question } from './Question'

export const QuestionList = ({ questionList }) => {
    return (
        <div>
            <>
                {
                    questionList.map((wrapper) => (
                        <Question key={wrapper.question.id} wrapper={wrapper} />
                    ))
                }
            </>
        </div>
    )
}
