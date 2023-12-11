import axios from "axios";
const PAYMENT_API_BASE_URL = "http://localhost:8080/auth/api/payment";
const Token = localStorage.getItem("accessToken")

class CartService {
  CreatePayment(description, items, amount) {
    let data = JSON.stringify({
      "description": description,
      "items": items,
      "amount": amount
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: PAYMENT_API_BASE_URL + '/create',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Token,
      },
      data: data
    };
    return axios.request(config);

  }

  CancelPayment(OrderCode) {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: PAYMENT_API_BASE_URL + '/cancel?orderCode='+OrderCode,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Token,
      },
    };
    return axios.request(config);

  }

}
export default new CartService();