import React, {useState, useEffect} from 'react'
import './authy.scss'
import App from './App';
import logo from './assets/lasg__logo.png'

export default function Authy() {

    const [error, setError] = useState('');
    const [isValidated, setIsValidated] = useState(false);
    const access = "$2024/06?.lasg_access$009";

    const handleSub = () => {

        const accessEle = document.getElementById('access_main').value;

        if (accessEle === ''){

           middle("All fields are required!", "bad");
           
           

        } else if (accessEle !== access) {

            middle( "Invalid / Unathorized Login", "bad")

        } else {

            window.sessionStorage.setItem('lasg_token', access);
            middle("Login Successful!", "ok");
            
            setTimeout(() => {

                setIsValidated(true)
                
            }, 2000);

        }

    }

    const middle = (message, status) => {


        const accessElement = document.getElementById('access');
        const errorElement = document.getElementById('error');

        setError(message);
        accessElement.classList.add(status);
        errorElement.classList.add(status)

        setTimeout(() => {

            setError('');
            accessElement.classList.remove(status);
            errorElement.classList.add(status)
            
        }, 3000);

    }

    useEffect(() => {


        const db = window.sessionStorage.getItem('lasg_token');
        
        if (db && db === access) {

            setIsValidated(true);

        } else {

            setIsValidated(false);

        }
        
        
    }, [isValidated]);

  return (

    <div className="appHome">

        {
            isValidated 

            ? <App/> 

            :

            (
                <div className="authPage">

                    <div className="image__scoop"><img src={logo} alt="" /></div>

                    <div className="loginPart">

                        <div className="topicTitle"> Hello There!  {<br></br>} <span>Welcome to LASG admin platform</span> </div>

                        <div className="form"> 

                            <div className="auth__form">
                                <label>Email Address</label>
                                <input type="email" placeholder='Enter email id' id = 'access' />
                            </div>

                            <div className="auth__form">
                                <label>Password</label>
                                <input type="text" placeholder='Enter password' id = 'access_main' />
                            </div>
                            <div className="submitBtn" onClick={ ()=>handleSub() }>Log into dashboard</div>

                        </div>

                        <div className="errorZone" id='error'> {error} </div>

                    </div>

                    <p className='foot'>Powered by Ministry of Innovation, Science & Technology</p>

                </div>

            )
        }

        

    </div>

  )

}
