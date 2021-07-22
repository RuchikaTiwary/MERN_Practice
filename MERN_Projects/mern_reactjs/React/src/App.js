import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import GoalList from './components/GoalList/GoalList';
import NewGoal from './components/NewGoal/NewGoal';

const App = () => {
  const [courseGoals, setCourseGoals] = useState([{ id: 'cg1', text: 'Finish Course' },
  { id: 'cg2', text: 'Learn Mern' },
  { id: 'cg3', text: 'Get Certified' },
  ]);

  const addNewHandler = (newGoal) => {
    // courseGoals.push(newGoal);
    // console.log(courseGoals);

    // setCourseGoals(courseGoals.concat(newGoal));
    setCourseGoals(prevCourseGoal => prevCourseGoal.concat(newGoal));

  }

  return (
    <div className="goal-course">
      <h2>Course Goals</h2>
      <NewGoal onAddNewGoal={addNewHandler} />
      <GoalList goals={courseGoals} />
    </div>
  );
};

/*class App extends React.Component {
  render() {
    return <h1>Hi, <u>This </u> is Reactjs !!</h1>
  }
}*/

export default App;
