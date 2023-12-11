import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JSAlert from 'js-alert'
import UserService from './UserService';
import successIcon from '../image/success.png';
import failIcon from '../image/cancel.png';



function VerifyEmail() {
    const usehistory = useNavigate();
    useEffect(() => {
        var url = new URL(window.location.href);
        console.log(url)
        const activeKey = url.searchParams.get('activeKey');
        UserService.VerifyEmail(activeKey)
            .then(response => {
                JSAlert.alert(response.data, "Email verified", successIcon).dismissIn(2000);
                console.log(response)
                usehistory('/login')

            })
            .catch(error => {
                JSAlert.alert(error.response.data, "Sign up fail", failIcon).dismissIn(2500);
                usehistory('/')
            })
    })



    return (
        <>
            <div className='loginpage'>
                <h1>Webcome to Beeclothes</h1>
            </div>
        </>
    );
}
export default VerifyEmail;
