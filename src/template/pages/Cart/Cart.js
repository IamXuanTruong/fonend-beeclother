import React, { useState } from "react";
import CartService from "../../../service/CartService";
import { useEffect } from "react";
import Checkout from "../../layout/modal/Checkout"
import CheckoutService from "../../../service/CheckoutService";
import Modal from "../../layout/modal/Modal";
import "./Cart.css"

function Cart() {
    const [loading, setLoading] = useState(false);
    const [paymentResponse, setPaymentResponse] = useState([]);
    const [data, setData] = useState([{}]);
    const [subtotal, setSubtotal] = useState(0);
    const [delivery, setDelivery] = useState(subtotal);
    const [totalprice, setTotalPrice] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [description, setDescription] = useState('');

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const increaseQuantity = (cart) => {
        CartService.UpdateProductInCart(cart.id, cart.quantity + 1)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

        const updatedProducts = data.map((item) => {
            if (item.id === cart.id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setData(updatedProducts);
        if (subtotal !== 0) {
            setSubtotal(subtotal + cart.product.price)

        }

    };

    const decreaseQuantity = (cart) => {
        if (cart.quantity === 1) {
            return;
        }
        CartService.UpdateProductInCart(cart.id, cart.quantity - 1)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

        const updatedProducts = data.map((item) => {
            if (item.id === cart.id) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setData(updatedProducts);
        if (subtotal !== 0) {
            setSubtotal(subtotal - cart.product.price)
        }



    };
    const [infoVisible, setInfoVisible] = useState({
        productInfo: false,
        refundPolicy: false,
    });

    const toggleInfoVisibility = (section) => {
        setInfoVisible({
            ...infoVisible,
            [section]: !infoVisible[section],
        });
    };
    useEffect(() => {
        CartService.GetProductInCart()
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setDelivery(subtotal * 0.1)
        setTotalPrice(subtotal + delivery)
    }, [subtotal, delivery]);


    const handleCheckboxChange = (event, productInfo) => {
        if (event.target.checked) {
            setSubtotal(subtotal + productInfo.product.price * (productInfo.quantity))

            console.log('Thông tin sản phẩm:', productInfo);
            setSelectedItems([...selectedItems, productInfo]); // Thêm item vào danh sách nếu được chọn

        } else {
            setSubtotal(subtotal - productInfo.product.price * productInfo.quantity)
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== productInfo.id));
            // Loại bỏ item nếu không được chọn
        }
    };
    const closeCheckout = () => {
        setShowPopup(false);
    }

    const handleCheckout = () => {
        setLoading(true);
        console.log("Amount : ", totalprice);
        const selectedItemsInfo = selectedItems.map(item => {
            return {
                name: item.product.nameProduct,
                price: item.product.price,
                quantity: item.quantity
            };
        });

        CheckoutService.CreatePayment(description, selectedItemsInfo, totalprice)
            .then((response) => {
                console.log(response.data);
                setPaymentResponse(response.data);
                setShowPopup(true);
                setLoading(false);

            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleDeleteClick = (cartId) => {
        setLoading(true);

        CartService.DeleteProductCart(cartId)
            .then((response) => {
                if (response) {
                    console.log("Product deleted successfully:", response.data);
                    // Reload the page after successful deletion
                    window.location.reload();

                } else {
                    console.error("Response is undefined or null");
                }
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <>
            <div className="cart_page">
                <div className="row cart">
                    <div className="col-lg-8">
                        <h5>My cart</h5>
                        <hr />
                        {(data && data.length > 0 && data[0].product) ?
                            data.map((item, index) => (
                                <div className="row" key={index}>
                                    <div className="col-lg-5">
                                        <div className="img_cart">
                                            <label className="checkbox-product">
                                                <input type="checkbox" onChange={(event) => handleCheckboxChange(event, item)} />
                                                <span className="checkmark"></span>
                                            </label>
                                            <img src={item.product.image} alt="product"></img>
                                            <div className="name_cart mt-4">
                                                <p>{item.product.nameProduct}</p>
                                                <p>Price:{item.product.price}</p>
                                                <p>Color: {item.product.color}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="icon_cart">
                                            <div className='quantily mt-4'>
                                                <button onClick={() => decreaseQuantity(item)} className='item_but'>-</button>
                                                {item.quantity}
                                                <button onClick={() => increaseQuantity(item)} className='item_but'>+</button>
                                            </div>
                                            <div className="mt-4">
                                                <div key={item.product.id}>
                                                    <p>{item.product.name}</p>
                                                    <a onClick={() => handleDeleteClick(item.id)} disabled={loading}>
                                                        {loading ? "Deleting..." : <i className="far fa-trash-alt "></i>}
                                                    </a>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            ))

                            : <p>test</p>}
                        <hr />
                        <div className='text_detail'>
                            <div className='title_detail' onClick={() => toggleInfoVisibility('productInfo')}>
                                <p><i className="fa-regular fa-clipboard"></i> Add a note</p>
                            </div>
                            {infoVisible.productInfo && (
                                <div className="">
                                    <textarea placeholder="Instructions? Special requests? Add them here." rows="4" cols="50"
                                        onChange={handleDescriptionChange}
                                        value={description}
                                    ></textarea>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-4 rightcontainer">
                        <h5>Order summary</h5>
                        <hr />
                        <div className="price_cart">
                            <p>Subtotal<span>{new Intl.NumberFormat('vn-VN').format(subtotal)}đ</span></p>
                        </div>
                        <p>Estimate Delivery<span>{new Intl.NumberFormat('vn-VN').format(delivery)}đ</span></p>
                        <hr />
                        <div className="total_cart">
                            <p>Total Price <span>{new Intl.NumberFormat('vn-VN').format(totalprice)}đ</span></p>
                        </div>
                        <div className="button-checkout">
                            <button className="button" onClick={handleCheckout}>Checkout</button>
                        </div>
                        <p className="text-center mt-3"><i className="fa-solid fa-lock"></i> Secure Checkout</p>
                    </div>
                </div>
            </div >
            <Checkout showPopup={showPopup} handleClose={closeCheckout} PaymentResponse={paymentResponse} />
            <Modal loading={loading} />
        </>
    )
}
export default Cart;