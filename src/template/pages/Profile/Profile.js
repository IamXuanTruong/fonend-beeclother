import React, { useState, useEffect } from "react";
import './Profile.css';
import UserService from '../../../service/UserService';

function Profile() {
    const [users, setUsers] = useState([]);
    const [selectedOption, setSelectedOption] = useState('My Profile');
    useEffect(() => {
        UserService.getUsers()
            .then((response) => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <>
            <div className='profile_page'>
                <div className='row'>
                    <div className='col-lg-4'>
                        <div className='menu_profile'>
                            <ul>
                                <li onClick={() => setSelectedOption('My Orders')}>
                                    <i className="fa-solid fa-box"></i> My Orders
                                </li>
                                <li onClick={() => setSelectedOption('My Profile')}>
                                    <i className="fa-regular fa-user"></i> My Profile
                                </li>
                                <li onClick={() => setSelectedOption('My Discount')}>
                                    <i className="fa-solid fa-tag"></i> My Discount
                                </li>
                                <li onClick={() => setSelectedOption('Favorite Products')}>
                                    <i className="fa-regular fa-heart"></i> Favorite Products
                                </li>
                                <li onClick={() => setSelectedOption('Security')}>
                                    <i className="fa-solid fa-key"></i> Security
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-lg-8'>
                        <div className='main_profile'>
                            <h5 className='text_profile'>{selectedOption}</h5>
                            {selectedOption === 'My Orders' && (
                                <div>
                                    {/* Hiển thị nội dung My Orders */}
                                </div>
                            )}
                            {selectedOption === 'My Profile' && (
                                <div className='profile_item'>
                                    <div className='row'>
                                        <div className='col-lg-5'>
                                            <div className='image_profile'>
                                                <i className="fa-solid fa-circle-user"></i>
                                            </div>
                                            <div className='update_image'>
                                                <p>Choose image</p>
                                            </div>
                                        </div>
                                        <div className='col-lg-7'>
                                            {users.map((user) => (
                                                <div className='full_profile'>
                                                    <div className='profile_user'>
                                                        <p>First Name :</p>
                                                        <p className='user_file'>{users.firstName}</p>
                                                    </div>
                                                    <div className='profile_user'>
                                                        <p>Last Name :</p>
                                                        <p className='user_file'>{user.lastName}</p>
                                                    </div>
                                                    <div className='profile_user'>
                                                        <p>Phone Number :</p>
                                                        <p className='user_file'>{user.phoneNumber}</p>
                                                    </div>
                                                    <div className='profile_user'>
                                                        <p>Email :</p>
                                                        <p className='user_file'>{user.email}</p>
                                                    </div>
                                                    <div className='profile_user'>
                                                        <p>Address :</p>
                                                        <p className='user_file'>{user.address}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='update_file'    >
                                        <button >Update</button>
                                    </div>
                                </div>
                            )}
                            {selectedOption === 'My Discount' && (
                                <div>
                                    {
                                        <h2>
                                            0
                                        </h2>
                                    }
                                </div>
                            )}
                            {selectedOption === 'Favorite ' && (
                                <div>
                                    {/* Hiển thị nội dung Favorite Products */}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Profile;
