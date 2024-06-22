import React, { useState, useEffect } from 'react';
import './todoapp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faLightbulb} from '@fortawesome/free-solid-svg-icons';
import { db } from '../firebase/firebase'; // Ensure this import is correct
import { ref, onValue, push, update, remove } from 'firebase/database';
import { useNavigate, useLocation } from 'react-router-dom';

const Todoapp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isBlack, setIsBlack] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const taskRef = ref(db, `tasks/${user.id}`);
    onValue(taskRef, (snapshot) => {
      const taskData = [];
      snapshot.forEach((childSnapshot) => {
        taskData.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setTasks(taskData);
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim() === '') {
      return;
    }
    const taskRef = ref(db, `tasks/${user.id}`);
    push(taskRef, {
      text: taskInput,
      completed: false,
    });
    setTaskInput('');
  };

  const handleCompleted = (id) => {
    const task = tasks.find((task) => task.id === id);
    const taskRef = ref(db, `tasks/${user.id}/${id}`);
    update(taskRef, {
      completed: !task.completed,
    });
  };

  const handleDelete = (id) => {
    const taskRef = ref(db, `tasks/${user.id}/${id}`);
    remove(taskRef);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleToggleChangeColor = () => {
    setIsBlack(prevIsBlack => !prevIsBlack)
  };


  return (
    <>
     
      <div className={`container ${isBlack ? 'isBlack' : ''}`}>
        <FontAwesomeIcon icon={faLightbulb} onClick={handleToggleChangeColor} className='bulb'/>
        <div className="paper">
          <h2 className="title">TO DO LIST</h2>
          <h2 className="name">{user.Name}</h2>
          <button onClick={handleLogout}>Logout</button>

          <form onSubmit={handleSubmit}>
            <div className="input-task">
              <input
                type="text"
                value={taskInput}
                placeholder="Input your task"
                onChange={handleChange}
              />
            </div>
            <div className="submit-task">
              <button type="submit">Submit your task</button>
            </div>
          </form>

          <ul className="ul-task">
            
            {tasks.map((task) => (
              <li key={task.id} className={`list-task ${task.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCompleted(task.id)}
                  className="check-box"
                />
                <div className="task-content">
                  <span className="task-text">{task.text}</span>
                </div>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete(task.id)}
                  className="delete"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todoapp;
