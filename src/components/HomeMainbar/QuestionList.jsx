import React from 'react'

import { Question } from './Question'

export const QuestionList = ({ questionList }) => {
    return (
        <div>
            <>
                {questionList.map((question) => (
                    <Question question={question} key={question.question.id} />
                ))
                }
            </>
        </div>
    )
}
