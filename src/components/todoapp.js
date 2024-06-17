import { useState } from "react";
import './todoapp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Todoapp = () => {

const [tasks, setTasks] = useState([]);
const [taskInput, setTaskInput] = useState('');

const handleChange = (e) => {
    setTaskInput(e.target.value);
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim() === ''){
        return;
    }
    const newTask = {id: tasks.length + 1, text: taskInput, completed: false};
    setTasks([...tasks, newTask]);
    setTaskInput('');
}

const handleCompleted = (id) => {
    setTasks(tasks.map(task =>
        task.id === id ? {...task   , completed: !task.completed} : task
    ));
};

const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
};


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