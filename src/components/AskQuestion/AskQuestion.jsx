import React from 'react'

import './AskQuestion.css'

export const AskQuestion = () => {

    return (
        <div className='ask-question'>
            <div className='ask-ques-container'>
                <h1>Ask a public Question</h1>
                <form>
                    <div className='ask-form-container'>
                        <label htmlFor='ask-ques-title'>
                            <h4>Title</h4>
                            <p>Be specific and imagine you're asking a question to another person.</p>
                            <input type='text' id='ask-ques-title' placeholder='e.g. Is there an R fuction for finding the index of an element in a vector?' />
                        </label>
                        <label htmlFor='ask-ques-body'>
                            <h4>What are the details of your problem?</h4>
                            <p>Introduce the problem and expand in what you put in the title. Minimum 20 characters.</p>
                            <textarea name='' id='ask-ques-body' cols='30' rows='10'></textarea>
                        </label>
                        <label htmlFor='ask-ques-tags'>
                            <h4>Tags</h4>
                            <p>Add up to 5 tags to describe what your question is about. Start typing to se suggestions.</p>
                            <input type='text' id='ask-ques-tags' placeholder='e.g. (excel iphone flutter)' />
                        </label>
                    </div>
                    <input className='review-btn' type='submit' value='Review your question' />
                </form>
            </div>
        </div>
    )
}
