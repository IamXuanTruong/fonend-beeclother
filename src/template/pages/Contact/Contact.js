import './Contact.css'
import React from 'react';
function Contact() {
    return (
        <>
            <div className="page_contact">
                <div className="header_contact">
                    <hr width="35%" align="center" color='black' />
                    <p>CONTACT</p>
                    <hr width="35%" align="center" color='black' />
                </div>
                <div className='main_contact'>
                    <div className='title_contact'>
                        <p>
                            For all order support, please include your order
                        </p>
                        <p>
                            number and date that your order was placed
                        </p>
                    </div>
                    <div className='form_contact'>
                        <form>
                            <div className='item_contact'>
                                <div className='item_form'>
                                    <label>
                                        Enter Your First Name
                                    </label>
                                    <input></input>
                                </div>
                                <div className='item_form'>
                                    <label>
                                        Enter Your First Name
                                    </label>
                                    <input></input>
                                </div>
                            </div>
                            <div className='item_contact'>
                                <div className='item_form'>
                                    <label>
                                        Enter Your First Name
                                    </label>
                                    <input></input>
                                </div>
                                <div className='item_form'>
                                    <label>
                                        Enter Your First Name
                                    </label>
                                    <input></input>
                                </div>
                            </div>
                            <div className='item_comment'>
                                <label>
                                    Enter Your Message Here
                                </label>
                                <textarea rows="7">
                                </textarea>
                            </div>
                            <div className='submit_contact'>
                                <button>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >

        </>
    )
}
export default Contact;