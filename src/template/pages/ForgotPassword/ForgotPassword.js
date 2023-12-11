import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './forgotPassword.css';
import UserService from '../../../service/UserService';
import JSAlert from 'js-alert'
import failIcon from '../../../image/cancel.png';
import SuccessIcon from '../../../image/success.png';
import Modal from "../../layout/modal/Modal";

function ForgotPassword() {
    
    const usehistory = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, SetUsername] = useState('');
    const [usernameError, setUserNameError] = useState('');

        const handleEmailChange = (e) => {
        SetUsername(e.target.value);
        validateEmail(e.target.value);
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
        setLoading(true);
        console.log("hellooooo");
        e.preventDefault();
        UserService.ResetEmailRequest(username)
        .then((response) =>{
            console.log(response);
            JSAlert.alert("Please check your email to reset password", "Successfull", SuccessIcon).dismissIn(2500);
            usehistory('/login')
        })
        .catch((error) => {
            console.log(error);
            JSAlert.alert("This email is invalidate", "Failed", failIcon).dismissIn(2500);

        }).finally(() => {
            setLoading(false);

        })
    }
    
  

    return (
        <>
            <div className='loginpage'>
                <div className='form_login'>
                    <h4>Reset password</h4>
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
                       
                        <div className='button_submit'>
                            <button type="submit">Send email</button>
                        </div>
                    </form>
                    <div className='cant_member'>
                        <p>Not a member?</p><span><Link to='/signup'>Sign up now</Link></span>
                    </div>
                    <div className='miss'>
                        <a href='/login'>Login</a>
                    </div>
                </div>
                <Modal loading={loading} />
            </div>
        </>
    );
}
export default ForgotPassword;
