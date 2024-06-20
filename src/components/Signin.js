import React, {useState, useEffect} from 'react';
import './Signin.css';
import { db } from '../firebase/firebase'; // Ensure this import is correct
import { ref, onValue, push } from 'firebase/database';

const Signin = () => {

    const [Credentials, setCredentials] = useState(
        {
            Name: '',
            Username: '',
            Password: '',

        }
    );
    
    useEffect(() => {

        const taksRef = ref(db, 'Registration');
       const unsubscribe = onValue (taksRef, (snapshot) => {
            const taskData = [];
            snapshot.forEach(childSnapshot => {
                taskData.push({id:childSnapshot.key, ...childSnapshot.val()});
            });
            setCredentials(prevState => ({
                ...prevState,
                ...taskData
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

    const handleSubmit = (e) => {
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

    return(
    <>

    <div className='container'>
        <div className='card'>
            <form onSubmit={handleSubmit}>
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


           

        </div>
    </div>

    </>
    )

} ;

export default Signin;