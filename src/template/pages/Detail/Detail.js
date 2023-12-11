import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductService from '../../../service/ProductService';
import './Detail.css';

function Detail() {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    useEffect(() => {
        ProductService.detailProduct(id)
            .then((response) => {
                setProduct(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const [infoVisible, setInfoVisible] = useState({
        productInfo: false,
        refundPolicy: false,
        shoppingInfo: false,
    });

    const toggleInfoVisibility = (section) => {
        setInfoVisible({
            ...infoVisible,
            [section]: !infoVisible[section],
        });
    };

    return (
        <div className='detail_page'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{product.nameProduct}</li>
                </ol>
            </nav>
            <div className='detail_product'>
                <div className='row'>
                    <div className='col-lg-7' key={product.id}>
                        <div className='detail_img'>
                            <img src={product.image} alt="Product" />
                        </div>
                        <p>{product.description}</p>
                    </div>
                    <div className='col-lg-5'>
                        <div className='product_detail'>
                            <h3>{product.nameProduct}</h3>
                            <div className='price'>
                                <p>{product.price}$</p>
                            </div>
                            <div className='size'>
                                <label for="size">Size:</label>
                                <select id="size">
                                    <option value="1">M</option>
                                    <option value="2">L</option>
                                    <option value="3">XL</option>
                                    <option value="4" >XXL</option>
                                </select>
                            </div>

                            <div className='quantity'>
                                <p>Quantity: </p>
                                <button onClick={decreaseQuantity} className='item_but'>-</button>
                                {quantity}
                                <button onClick={increaseQuantity} className='item_but'>+</button>
                            </div>
                            <div className='button_item'>
                                <button className='button_cart' onclick="addToCart()">Add to Cart</button>
                                <button className='button_like'><i className="fa-regular fa-heart"></i></button>
                            </div>
                            <button className='button_buy' >
                                Buy Now
                            </button>
                            <div className='text_detail'>
                                <div className='title_detail' onClick={() => toggleInfoVisibility('productInfo')}>
                                    <h6>PRODUCT INFO</h6>
                                    <i className={`fa-solid ${infoVisible.productInfo ? 'fa-minus' : 'fa-plus'}`}></i>
                                </div>
                                {infoVisible.productInfo && (
                                    <p>
                                        I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.
                                    </p>
                                )}
                            </div>
                            <hr />
                            <div className='text_detail'>
                                <div className='title_detail' onClick={() => toggleInfoVisibility('refundPolicy')}>
                                    <h6>RETURN & REFUND POLICY</h6>
                                    <i className={`fa-solid ${infoVisible.refundPolicy ? 'fa-minus' : 'fa-plus'}`}></i>
                                </div>
                                {infoVisible.refundPolicy && (
                                    <p>
                                        I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.
                                    </p>
                                )}
                            </div>
                            <hr />
                            <div className='text_detail'>
                                <div className='title_detail' onClick={() => toggleInfoVisibility('shoppingInfo')}>
                                    <h6>SHOPPING INFO</h6>
                                    <i className={`fa-solid ${infoVisible.shoppingInfo ? 'fa-minus' : 'fa-plus'}`}></i>
                                </div>
                                {infoVisible.shoppingInfo && (
                                    <p>
                                        I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Detail;