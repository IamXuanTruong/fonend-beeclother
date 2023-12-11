import React from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <div className='footer'>
            <div className='main_footer'>
                <div className='name_footer'>
                    <Link to="/">Bee<i className="fa-brands fa-forumbee"></i>Clothe .</Link >
                    <hr width="80%" align="center" color='black' />
                </div>
                <div className='footer_main'>
                    <div className='row'>
                        <div className='col-lg-3'>
                            <div className='page_footer'>
                                <div className='item_footer'>
                                    <a href='/#'>Shop</a>
                                </div>
                                <div className='item_footer'>
                                    <a href='/#'>About</a>
                                </div>
                                <div className='item_footer'>
                                    <a href='/#'>Journal</a>
                                </div>
                                <div className='item_footer'>
                                    <a href='/#'>Contact</a>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3'>
                            <div className='page_footer'>
                                <div className='item_footer'>
                                    <a href='/#'>FAQ</a>
                                </div>
                                <div className='item_footer'>
                                    <a href='/#'>Shipping & Returns</a>
                                </div>
                                <div className='item_footer'>
                                    <a href='/#'>Store Policy</a>
                                </div>
                                <div className='item_footer'>
                                    <a href='/#'>Payments</a>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3'>
                            <div className='page_footer'>
                                <div className='item_footer'>
                                    <a href='/#'>info@my-domain.com</a>
                                </div>
                                <div className='item_footer'>
                                    <a href='/#'>500 Terry Francine Street </a>
                                </div>
                                <div className='item_footer'>
                                    <a href='/#'>San Francisco, CA 94158</a>
                                </div>
                                <div className='item_footer'>
                                    <a href='/#'>Tel: 123-456-7890</a>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3'>
                            <div className='page_footer'>
                                <div>
                                    <p>Sign up. Stay stylish</p>
                                </div>
                                <div className='input_footer'>
                                    <input placeholder='Enter your email here' type='text' />
                                </div>
                                <div className='button_footer'>
                                    <button>
                                        Subscribe Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Footer;