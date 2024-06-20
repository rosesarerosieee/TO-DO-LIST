import React, {useState, useEffect} from 'react';
import './Signin.css';
import { db } from '../firebase/firebase'; // Ensure this import is correct
import { ref, onValue, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Todoapp from './todoapp';

const Signin = () => {

    const [Credentials, setCredentials] = useState(
        {
            Name: '',
            Username: '',
            Password: '',

        }
    );

    const [loginCredentials, setLoginCredentials] = useState(
        {
            Username : '',
            Password: '',
        }
    );

    const [errorMessage, setErrorMessage] = useState('');
    const [allUsers, setAllUser] = useState([]);

    const navigate = useNavigate();

    
    useEffect(() => {

        const taksRef = ref(db, 'Registration');
       const unsubscribe = onValue (taksRef, (snapshot) => {
            const users = [];
            snapshot.forEach(childSnapshot => {
                users.push({id:childSnapshot.key, ...childSnapshot.val()});
            });
            setCredentials(prevState => ({
                ...prevState,
                ...users
            }));
        });

        return () => unsubscribe();
    }, []);

     
    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials(prevState =>  ({
            ...prevState,
            [name] : value
        }));

    }
    
    const handleLoginChange = (e) => {
        const {name, value} = e.target;
        setLoginCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();   
        const taskRef = ref(db, 'Registration');
        const {Name, Username, Password} = Credentials
        push (taskRef, {
            Name,
            Username,
            Password,

        }).then(() => {

            setCredentials({
                Name: " ",
                Username: '',
                Password: '',
            });
        }).catch(error => {
            console.error("Error pushing credentials",error);
        });

        alert("Register Succesful!");
    
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const {Username, Password} = loginCredentials;
        
        const user =allUsers.find(user => user.Username === Username && user.Password === Password);
        
        if (user) {
            setErrorMessage('')
            navigate('./todoapp');
        }else{
            setErrorMessage('Invalid Username or Password.');
        }
    }; 

    return(
    <>

    <div className='container'>
        <div className='card'>
            <form onSubmit={handleRegisterSubmit}>
            <div className='name-input'>
                <input 
                type='text' 
                name='Name' 
                value={Credentials.Name} 
                onChange={handleChange}
                 placeholder='Enter your name'
                 required
                />
            </div>

            <div className='username-input'>
                 <input 
                 type='text'
                  name='Username'
                  value={Credentials.Username}
                  onChange={handleChange}
                  placeholder='Enter your Username'
                  required
                />
            </div>

            <div className='password-input'>
                  <input 
                  type='password'
                  name='Password'
                  value={Credentials.Password}
                  onChange={handleChange}
                  placeholder='Enter your Password'
                  required
                  />
            </div>
            
                <div className='login-button'>
                  <button type='submit'>Register</button>
                </div>

            </form>

            <form onSubmit={handleLoginSubmit}>
                    <div className='username-input'>
                        <input
                            type='text'
                            name='Username'
                            value={loginCredentials.Username}
                            onChange={handleLoginChange}
                            placeholder='Enter your username'
                            required
                        />
                    </div>
                    <div className='password-input'>
                        <input
                            type='password'
                            name='Password'
                            value={loginCredentials.Password}
                            onChange={handleLoginChange}
                            placeholder='Enter your password'
                            required
                        />
                    </div>
                    <div className='login-button'>
                        <button type='submit'>Login</button>
                    </div>
                </form>

                {errorMessage && <p className="error">{errorMessage}</p>}
           

        </div>
    </div>

    </>
    )

} ;

export default Signin;