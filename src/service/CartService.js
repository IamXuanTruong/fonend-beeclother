import axios from "axios";
const Cart_API_BASE_URL = "http://localhost:8080/auth/api/cart";
const Token = localStorage.getItem("accessToken")

class CartService {
    AddProductToCart(productId, quantity) {
        console.log(Token);
        let data = JSON.stringify({
            "productId": productId,
            "quantity": quantity
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: Cart_API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Token,
            },
            data: data
        };
        return axios.request(config);
    }
    GetProductInCart() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: Cart_API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Token,
            },
        };
        return axios.request(config);
    }


    UpdateProductInCart(cartId, quantity) {
        let data = JSON.stringify({
            "quantity": quantity
        });
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: Cart_API_BASE_URL + '/updatecart?cartId=' + cartId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Token,
            },
            data: data

        };

        return axios.request(config);
    }
    DeleteProductCart(cartId) {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${Cart_API_BASE_URL}/delete/${cartId}`,

            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Token,
            },
        };
        return axios.request(config)


    }

}
export default new CartService();