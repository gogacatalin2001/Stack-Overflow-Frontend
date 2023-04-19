import React from 'react'

import { Question } from './Question'

export const QuestionList = ({ questionList }) => {
    return (
        <div>
            <>
                {
                    questionList.map((question) => (
                        <Question key={question.id} question={question} />
                    ))
                }
            </>
        </div>
    )
}
