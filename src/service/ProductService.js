import axios from "axios";
const PRODUCTS_API_BASE_URL = "http://localhost:8080/product";
class ProductService {
    getAllProducts() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: PRODUCTS_API_BASE_URL,
        };
        return axios.request(config)
    }
    createProduct(product) {
        return axios.post(PRODUCTS_API_BASE_URL + "/create", product);
    }
    deleteProduct(id) {
        return axios.delete(PRODUCTS_API_BASE_URL + "/delete/" + id);
    }
    detailProduct(id) {
        return axios.get(PRODUCTS_API_BASE_URL + "/detail/" + id);
    }
    searchProduct(query) {
        return axios.get(PRODUCTS_API_BASE_URL + "/search", {
            params: {
                query: query,
            },
        });
    }
    
}
export default new ProductService();