import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import JSAlert from 'js-alert'
import UserService from './UserService';
import successIcon from '../image/success.png';
import failIcon from '../image/cancel.png';
import Modal from "../template/layout/modal/Modal";



function SetNewPassword() {
    const usehistory = useNavigate();
    const [loading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [confirmpasswordError] = useState('');
    const [passwordError] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ngu");
        var url = new URL(window.location.href);
        console.log(url)
        const Token = url.searchParams.get('token');
        console.log(Token);
        UserService.ResetPassword(Token, password)
            .then((response) => {
                JSAlert.alert("khong teo", "Email verified", successIcon).dismissIn(2000);
                console.log(response)
                usehistory('/login')

            })
            .catch((error) => {
                console.log(error);
                JSAlert.alert("teof", "Sign up fail", failIcon).dismissIn(2500);
            })
    }



    return (
        <>
            <div className='loginpage'>
                <div className='form_login'>
                    <h4>Set new password</h4>
                    <form onSubmit={handleSubmit}>
                        <div className='type-input'>
                            <input
                                placeholder='Enter your new password'
                                type='password'
                                name='password'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <div className='error-message'>{passwordError}</div>
                        </div>
                        <div className='type-input'>
                            <input
                                placeholder='Confirm Password'
                                type='password'
                                name='password'
                                value={confirmpassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            <div className='error-message'>{confirmpasswordError}</div>
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
export default SetNewPassword;
