import React, { useState, useEffect,useCallback  } from "react";
import img1 from '../../../image/img1.png';
import img2 from '../../../image/img2.png';
import img3 from '../../../image/img3.png';
import img4 from '../../../image/img4.png';
import './Home.css';
import ProductService from "../../../service/ProductService";
import { Link } from "react-router-dom";
import ModalAddtoCart from "../../layout/modal/ModalAddtoCart"
function Home() {
    const [product_id, setProduct_id] = useState();

    const [products, setProducts] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const intervalDuration = 3000; // Độ trễ 2 giây
    const [showPopup, setShowPopup] = useState(false);

    const openModal = (productId) => {
        console.log(productId);
        setShowPopup(true,productId);
        setProduct_id(productId)
    }

    const closeModal = () => {
        setShowPopup(false);
    }
    const images = [img1, img2, img3, img4];

    const nextSlide = useCallback(() => {
        setCurrentSlide((currentSlide + 1) % images.length);
    }, [currentSlide, images.length]);
    
    useEffect(() => {
        const interval = setInterval(nextSlide, intervalDuration);
    
        return () => {
            clearInterval(interval);
        };
    }, [nextSlide, intervalDuration]);
    
    useEffect(() => {
        ProductService.getAllProducts()
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <>

            <div className='home_page'>
                <div className='title_home'>
                    <hr width="35%" align="center" color='black' />
                    <p>WOMEN'S APPAREL BRAND</p>
                    <hr width="35%" align="center" color='black' />

                </div>
                <div className="carousel_home">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            {images.map((_, index) => (
                                <li
                                    key={index}
                                    data-target="#carouselExampleIndicators"
                                    data-slide-to={index}
                                    className={index === currentSlide ? 'active' : ''}
                                ></li>
                            ))}
                        </ol>
                        <div className="carousel-inner">
                            {images.map((image, index) => (
                                <div key={index} className={`carousel-item ${index === currentSlide ? 'active' : ''}`}>
                                    <img className="d-block w-100" src={image} alt={`Slide ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div className='title_home2'>
                    <hr width="35%" align="center" color='black' />
                    <p>FEATURED ITEMS</p>
                    <hr width="35%" align="center" color='black' />
                </div>
                <div className="list_product">
                    <div className="row">
                        {products.slice(0, 3).map((product) => (
                            <div className="col-lg-4" key={product.id}>
                                <div className='main_home'>
                                    <div className="card" style={{ width: "100%" }}>
                                        <img src={product.image} className="card-img-top" alt="Product" />
                                        <div className="card-body">
                                            <Link to={`/detail/${product.id}`}>{product.nameProduct}</Link>
                                            <p className="card-text">{product.description}</p>
                                            <p className="card-text">{new Intl.NumberFormat('vn-VN').format(product.price)}<span>đ</span></p>
                                            <div className="add_to_cart">   
                                                <button onClick={() => openModal(product.id)}>Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="home_shop">
                    <Link to="/shop">
                        Shop All
                    </Link>
                </div>
                <hr width="75%" align="center" color='gray' />
                <div className="rebranding">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="rebranding_item">
                                <div className="rebranding_icon">
                                    <i className="fa-regular fa-thumbs-up"></i>
                                </div>
                                <h6>QUALITY GOODS</h6>
                                <p>Enjoy top quality items at reasonable prices</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="rebranding_item">
                                <div className="rebranding_icon">
                                    <i className="fa-solid fa-headset"></i>
                                </div>
                                <h6>24/7 SUPPORT</h6>
                                <p>Get instant support whenever you need it</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="rebranding_item">
                                <div className="rebranding_icon">
                                    <i className="fa-solid fa-truck-fast"></i>
                                </div>
                                <h6>FAST SHIPPING</h6>
                                <p>Fast and reliable delivery options</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="rebranding_item">
                                <div className="rebranding_icon">
                                    <i className="fa-solid fa-sack-dollar"></i>
                                </div>
                                <h6>SECURE PAYMENT</h6>
                                <p>Many secure payment methods for you</p>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalAddtoCart showPopup={showPopup} handleClose={closeModal} product_id={product_id}/>
            </div>
        </>
    );
}

export default Home;
