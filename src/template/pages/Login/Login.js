import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Login.css';
import UserService from '../../../service/UserService';
import JSAlert from 'js-alert'
import failIcon from '../../../image/cancel.png';
import SuccessIcon from '../../../image/success.png';
import Modal from "../../layout/modal/Modal";

function Login() {
    
    const usehistory = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, SetUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUserNameError] = useState('');
    const [passwordError] = useState('');

    const handleEmailChange = (e) => {
        SetUsername(e.target.value);
        validateEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const validateEmail = (input) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(input)) {
            setUserNameError('Please enter a valid email address');
        } else {
            setUserNameError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        UserService.Login(username,password)
        .then((response) => {
            console.log(response);
            localStorage.setItem("accessToken",response.data.accessToken)
            window.dispatchEvent(new Event("storage"));
            usehistory('/')
            window.location.reload(true)
            JSAlert.alert("Welcome to BeeClothes", "Successfully", SuccessIcon).dismissIn(500);

        })
        .catch((error) => {
            console.log(error)
            
            if(error.response.status  === 400){
                JSAlert.alert("Please active your account", "Login failed", failIcon).dismissIn(2500);
                
            }else{
                JSAlert.alert("Your email or password is wrong!", "Login failed", failIcon).dismissIn(2500);
            }
        }).finally(() => {
            setLoading(false);
        })
   
        
    };

    return (
        <>
            <div className='loginpage'>
                <div className='form_login'>
                    <h4>Login</h4>
                    <form onSubmit={handleSubmit}>
                        <div className='type-input'>
                            <input
                                placeholder='Enter your email'
                                type='email'
                                name='email'
                                value={username}
                                onChange={handleEmailChange}
                            />
                            <div className='error-message'>{usernameError}</div>
                        </div>
                        <div className='type-input'>
                            <input
                                placeholder='Enter your password'
                                type='password'
                                name='password'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <div className='error-message'>{passwordError}</div>
                        </div>
                        <div className='button_submit'>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                    <div className='cant_member'>
                        <p>Not a member?</p><span><Link to='/signup'>Sign up now</Link></span>
                    </div>
                    <div className='miss'>
                        <a href='/forgotPassword'>Forgot Password?</a>
                    </div>
                </div>
                <Modal loading={loading} />
            </div>
        </>
    );
}
export default Login;
