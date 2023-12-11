import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/";
const Token = localStorage.getItem("accessToken")
class UserService {
    createUser(userData) {
        return axios.post(USER_API_BASE_URL + "register", userData);
    }
    Login(username, password) {
        let data = JSON.stringify({
            "email": username,
            "password": password
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: USER_API_BASE_URL + 'login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };
        return axios.request(config)

    }
    VerifyEmail(Activetoken) {
        return axios.get(USER_API_BASE_URL + "verify", {
            params: {
                activeKey: Activetoken
            }
        })
    }
    ResetEmailRequest(email) {
        let data = JSON.stringify({
            "email": email,
        });
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: USER_API_BASE_URL + 'login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };
        return axios.request(config)
    }
    ResetPassword(token, newpassword) {
        let data = JSON.stringify({
            "newPassword": newpassword,
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: USER_API_BASE_URL + 'reset-password',
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                token: token
            },
            data: data
        };
        return axios.request(config)
    }

}

export default new UserService();
