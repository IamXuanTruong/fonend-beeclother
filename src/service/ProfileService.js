import axios from "axios";
const USERS_API_BASE_URL = "http://localhost:8080/user";
class ProfileService {
    getUser() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: USERS_API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Token,
            },
        };
        return axios.request(config);
    }
}
export default new ProfileService();