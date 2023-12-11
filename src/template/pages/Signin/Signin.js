import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Signin.css';
import UserService from "../../../service/UserService";
import JSAlert from 'js-alert'
import failIcon from '../../../image/cancel.png';
import successIcon from '../../../image/success.png';
import Modal from "../../layout/modal/Modal";



function Signin() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [comfirmpassword, setcomfirmpassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumer, setPhoneNumber] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [comfirmpasswordError, setcomfirmpasswordError] = useState('');
    const [firstNameError, setfirstNameError] = useState('');
    const [lastNameError, setlastNameError] = useState('');
    const [addressErr, setAddressErr] = useState('');
    const [phoneNumerErr, setPhoneNumberErr] = useState('');



    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        validateEmail(e.target.value);
    };


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };



    const handlefirstNameChange = (e) => {
        setfirstName(e.target.value);
    };

    const handlelastNameChange = (e) => {
        setlastName(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setcomfirmpassword(e.target.value);
    };
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };
    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const validateEmail = (input) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(input)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const isValid = handleSubmit();

        if (isValid) {
            setLoading(true);
            const userData = {
                firstName,
                lastName,
                email,
                password,
                role: "USER",
                address,
                phoneNumer
            };

            UserService.createUser(userData)
                .then(response => {

                    JSAlert.alert("Please, check your email for active acount", "Sign up successfull", successIcon).dismissIn(2500);;
                    console.log(response);
                })
                .catch(error => {
                    if (error.response.data) {
                        JSAlert.alert(error.response.data, "Sign up fail", failIcon).dismissIn(2500);;
                    }
                }).finally(() => {
                    setLoading(false);

                })
        }
    };



    const handleSubmit = () => {
        setEmailError('');
        setPasswordError('');
        setfirstNameError('');
        setlastNameError('');
        setcomfirmpasswordError('');
        setAddressErr('');
        setPhoneNumberErr('')
        let isValid = true;

        if (!email) {
            setEmailError('Please enter your email');
            isValid = false;
        }
        if (!password) {
            setPasswordError('Please enter your password');
            isValid = false;
        }
        if (!firstName) {
            setfirstNameError('Please enter your firstName');
            isValid = false;
        }
        if (!lastName) {
            setlastNameError('Please enter your lastName');
            isValid = false;
        }
        if (!comfirmpassword) {
            setcomfirmpasswordError('Please enter your comfirm password');
            isValid = false;
        }

        return isValid;
    };


    return (
        <div className='loginpage'>
            <div className='form_login'>
                <h4>Create Account</h4>
                <div className="icon_sign">
                    <div className="item_icon">
                        <a href="/#">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                    </div>
                    <div className="item_icon">
                        <a href="/#">
                            <i className="fa-brands fa-google-plus"></i>
                        </a>
                    </div>
                    <div className="item_icon">
                        <a href="/#">
                            <i className="fa-solid fa-circle-info"></i>
                        </a>
                    </div>
                </div>
                <p>
                    or use your email for registration
                </p>
                <form onSubmit={onSubmit}>
                    <div className="type-name">
                        <div className="firt_name">
                            <input
                                placeholder="First Name"
                                type='text'
                                name='firstName'
                                value={firstName}
                                onChange={handlefirstNameChange}
                            />
                            <div className='error-message'>{firstNameError}</div>
                        </div>
                        <div className="firt_name">
                            <input
                                placeholder="Last Name"
                                type='text'
                                name='lastName'
                                value={lastName}
                                onChange={handlelastNameChange}
                            />
                            <div className='error-message'>{lastNameError}</div>
                        </div>
                    </div>
                    <div className='type-input'>
                        <input
                            placeholder='Enter your email'
                            type='email'
                            name='email'
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <div className='error-message'>{emailError}</div>
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
                    <div className='type-input'>
                        <input
                            placeholder='Confirm Password'
                            type='password'
                            name='comfirmpassword'
                            value={comfirmpassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        <div className='error-message'>{comfirmpasswordError}</div>
                    </div>
                    <div className='type-input'>
                        <input
                            placeholder='Address'
                            type='text'
                            name='address'
                            value={address}
                            onChange={handleAddressChange}
                        />
                        <div className='error-message'>{addressErr}</div>
                    </div>
                    <div className='type-input'>
                        <input
                            placeholder='Phone number'
                            type='text'
                            name='phoneNumber'
                            value={phoneNumer}
                            onChange={handlePhoneNumberChange}
                        />
                        <div className='error-message'>{phoneNumerErr}</div>
                    </div>
                
                    <div className='button_submit'>
                        <button type="submit">Register</button>
                    </div>
                </form>
                <div className='cant_member'>
                    <p>Have an Account?</p><span><Link to='/login'>Login now</Link></span>
                </div>
            </div>
            <Modal loading={loading} />

        </div>



    );
}
export default Signin;
