import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Header.css';
import { useRef } from 'react';
import ProductService from '../../../service/ProductService'
function Header() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") != null);
    const [showPopup, setShowPopup] = useState(false);
    const buttonRef = useRef(null);
    const popupRef = useRef(null);
    const [producArr, setproductArr] = useState([])
    const [producArrSearch, setproductArrSearch] = useState([])



    useEffect(() => {
        ProductService.getAllProducts()
            .then((response) => {
                setproductArr(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        const handleOutsideClick = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target) && showPopup) {
                setShowPopup(false);
            }
        };
        const storedAccessToken = localStorage.getItem("accessToken") != null;
        setAccessToken(storedAccessToken);

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };

    }, [showPopup]);

    window.addEventListener('storage', () => {
        if (localStorage.getItem("accessToken") != null) {
            setAccessToken(true)
        }
    });

    const Logout = () => {
        localStorage.removeItem("accessToken")
        setAccessToken(false);

    }
    const showSearchPopup = () => {

        setShowPopup((prevShowPopup) => !prevShowPopup);

    }
    const onChangeHandle = (e) => {
        const regex = new RegExp(e.target.value, 'i'); // Tạo regex từ giá trị nhập vào, 'i' để không phân biệt hoa thường
        if (e.target.value === '') {
            setproductArrSearch([])
        } else {
            const searchResult = producArr.filter(item => regex.test(item.nameProduct));
            setproductArrSearch(searchResult);

        }
    }
    return (
        <>
            <div className='header'>
                <div className='main_header'>
                    <div className='header_content'>
                        <div style={{ width: 150 }}></div>
                        <div className='name_header'>
                            <Link to="/"><div className='Logo'></div></Link >
                        </div>


                        <div className='icon_header'>
                            <div className='search_icon'>
                                <div>
                                    <a href='/#' ref={buttonRef} onClick={showSearchPopup}>
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </a>
                                    <span className={`box-triangle ${showPopup ? 'showPopupSearch' : 'hidden'}`}>
                                        <svg viewBox="0 0 20 9" role="presentation">
                                            <path d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z" fill="#ffffff"></path>
                                        </svg>
                                    </span>
                                </div>
                                <div ref={popupRef} className={`search_result ${showPopup ? 'showPopupSearch' : 'hidden'}`}>
                                    <div className='search-input'>
                                        <p style={{ margin: 10 }} >Tìm kiếm</p>
                                        <input type='text' onChange={onChangeHandle} placeholder='Search ...' />
                                        <div className='icon_search'>
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </div>
                                    </div>

                                    <ul className='list-product-search'>
                                        {producArrSearch.slice(0, 4).map(item => {
                                            return (
                                                <li className={`product-search ${showPopup ? 'showProductSearch' : ''}`} key={item.id}>
                                                    <div>
                                                        <img src={item.image} style={{ width: 140, height: 140 }} alt='product'></img>
                                                    </div>
                                                    <div className='infor-product-search'>
                                                        <p>{item.nameProduct}</p>
                                                        <p>{item.descriptions}</p>
                                                        <p>{item.price}</p>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            {accessToken ? (
                                <div className='cart_icon'>
                                    <Link to="/cart">
                                        <i className="fa-solid fa-bag-shopping"></i>
                                    </Link>
                                </div>
                            ) : (
                                <div className='cart_icon'>
                                    <Link to="/login">
                                        <i className="fa-solid fa-bag-shopping"></i>
                                    </Link>
                                </div>
                            )}
                            {/* <div className='cart_icon'>

                                <Link to="/cart">
                                    <i className="fa-solid fa-bag-shopping"></i>
                                </Link>
                            </div> */}

                            {accessToken ? (
                                <div className='user_icon'>
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <div className="user_dropdown">
                                        <Link to="/profile">Profile</Link>
                                        <Link onClick={Logout}>Logout</Link>
                                    </div>
                                </div>
                            ) : (
                                <div className='user_icon'>
                                    <Link to="/login">
                                        <i className="fa-solid fa-user"></i>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='menu'>
                        <div className='item_menu'>
                            <Link to='/'>HOME</Link>
                        </div>
                        <div className='item_menu'>
                            <Link to='/shop'>SHOP</Link>
                        </div>
                        <div className='item_menu'>
                            <Link to="/about">ABOUT</Link >
                        </div>
                        <div className='item_menu'>
                            <a href='/#'>JOURNAL</a>
                        </div>
                        <div className='item_menu'>
                            <Link to="/contact">CONTACT</Link >
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Header;