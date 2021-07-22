import React, { useState } from 'react';

import './NewGoal.css'

const NewGoal = props => {
    const [userEnteredGoal, setEnteredText] = useState('');

    const submitHandler = event => {
        event.preventDefault();

        const newGoal = {
            id: Math.random().toString(),
            text: userEnteredGoal
        }

        setEnteredText('');
        console.log(newGoal);
        props.onAddNewGoal(newGoal);
    }

    const textChangeHandler = event => {
        setEnteredText(event.target.value);
    }

    return (
        <form className="new-goal" onSubmit={submitHandler}>
            <input type="text" onChange={textChangeHandler} />
            <button type="submit">Add Goal</button>
        </form>
    );
};

export default NewGoal;