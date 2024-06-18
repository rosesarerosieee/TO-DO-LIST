// Todoapp.js
import React, { useState, useEffect } from 'react';
import './todoapp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { db } from '../firebase/firebase'; // Ensure this import is correct
import { ref, onValue, push, update, remove } from 'firebase/database';

const Todoapp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

 useEffect(() => {

  const tasksRef = ref(db, 'task');
  onValue(tasksRef, (snapshot) => {
    const taskData = [];
    snapshot.forEach(childSnapshot => {
        taskData.push({id: childSnapshot.key, ...childSnapshot.val() });
    });
    setTasks(taskData);
  });
 },[]);


  const handleChange = (e) => {
    setTaskInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim() === ''){
        return;
    }
    const taskRef = ref(db, 'task');
    push (taskRef, {
        text: taskInput,
        completed: false,
    });
    setTaskInput('');
  }

  const handleCompleted = (id) => {
    const task = tasks.find(task => task.id === id);
    const taskRef = ref(db, `task/${id}`);
    update (taskRef, {
        completed: !task.completed,
    });
  };

  const handleDelete = (id) => {
    const taskRef = ref(db, `task/${id}`);
    remove(taskRef);
  }

  return (
    <>
    <div className="container">
        <div className="paper">
            <h2 className="title">TO DO LIST</h2>
            <h2 className="name">Your name</h2>

            <form onSubmit={handleSubmit}>
                <div className="input-task">
                    <input
                        type="text"
                        value={taskInput}
                        placeholder="Input your task"
                        onChange={handleChange}/>
                </div>
                <div className='submit-task'>
                    
                    <button type="submit">Submit your task</button>
                    
                </div>
            </form>

                <ul className="ul-task">
                  {tasks.map((task) => (
                    <li key={task.id} className={`list-task ${task.completed ? 'completed' : ''}`}>
                        <input type="checkbox" onClick={() => handleCompleted(task.id)} className="check-box"/>
                        <div className="task-content">
                            <span className="task-text">{task.text}</span>
                        </div>
                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(task.id)} className="delete"/>
                    </li>
                   ))}
                   
                </ul>

        </div>   
    </div> 
    </>
)


  };

export default Todoapp;
