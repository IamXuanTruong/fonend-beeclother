import React, { useState } from 'react';
import './Modal.css';
import './Checkout.css'
import JSAlert from 'js-alert'
import SuccessIcon from '../../../image/success.png';
import QuestionIcon from '../../../image/question-mark.png'
import BankLogo from '../../../image/mbbank.png'
import CheckoutService from '../../../service/CheckoutService';
function Checkout({ showPopup, handleClose ,PaymentResponse }) {
    const [imgQR] = useState('https://img.vietqr.io/image/970422-VQRQ000132qbg-compact1.png?amount='+PaymentResponse.amount+'&addInfo='+PaymentResponse.description+'&accountName='+PaymentResponse.accountName+'');
    const CancelPayment = (Ordercode) =>{
        console.log(Ordercode);
        JSAlert.confirm("Are you sure you want to cancel this transaction?","Cancel payment",QuestionIcon).then(function(result) {
            if (!result)
                return;
            CheckoutService.CancelPayment(Ordercode)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                JSAlert.alert("Payment Cancelled","Success",SuccessIcon).dismissIn(2000);
                handleClose();
              })
              .catch((error) => {
                console.log(error);
              });
            
        
        });
    }
    return (
        <>
        
            <div className='modal-checkout' style={{ display: showPopup ? 'flex' : 'none' }}>
                <div className='Checkout'>
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <p className='close-checkout' onClick={handleClose}><i className="fa-solid fa-x"></i></p>
                    </div>
                    <div className='notify'>
                        <p className='note'><i className="fa-regular fa-lightbulb" ></i>Mở App Ngân hàng bất kỳ để <b className="text-sm">quét mã VietQR</b> hoặc <b className="text-sm">chuyển khoản</b> chính xác nội dung bên dưới</p>
                    </div>

                    <div className='row'>
                        <div className='col-lg-6'>
                            <img src={imgQR} alt='qrCode' style={{ width: '80%' }}></img>
                        </div>
                        <div className='col-lg-6'>
                            <div className='name-logo-bank'>
                                <div className='logo-bank'>
                                    <img src={BankLogo} alt='banklogo'></img>
                                </div>
                                <div className='name-bank'>
                                    <p>Ngân hàng</p>
                                    <p>Ngân hàng TMCP Quân đội</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p className='label-infor'>Chủ tài khoản :</p>
                                    <p className='content-infor'>{PaymentResponse.accountName}</p></div>
                            </div>

                            <div className='infor-bank'>
                                <div>
                                    <p className='label-infor'>Số tài khoản :</p>
                                    <p className='content-infor'>{PaymentResponse.accountNumber}</p>
                                </div>

                                <div>
                                    <button className='btn-copy'  onClick={() => {navigator.clipboard.writeText(PaymentResponse.accountNumber)}}>Sao chép</button>
                                </div>
                            </div>

                            <div className='infor-bank'>
                                <div>
                                    <p className='label-infor'>Số tiền :</p>
                                    <p className='content-infor'>{new Intl.NumberFormat('vn-VN').format(PaymentResponse.amount)}<span style={{padding:10}}>vnd</span></p>
                                </div>

                                <div>
                                    <button className='btn-copy'  onClick={() => {navigator.clipboard.writeText(PaymentResponse.amount)}}>Sao chép</button>
                                </div>
                            </div>

                            <div className='infor-bank'>
                                <div>
                                    <p className='label-infor'>Nội dung :</p>
                                    <p className='content-infor'>{PaymentResponse.description}</p>
                                </div>

                                <div>
                                    <button className='btn-copy' onClick={() => {navigator.clipboard.writeText(PaymentResponse.description)}}>Sao chép</button>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className='footer-popup notify'>
                        <div className='button-canel'>
                            <div id="icon-cancel">
                                <button onClick={() => {CancelPayment(PaymentResponse.orderCode)}}>Huỷ</button>
                            </div>
                        </div>
                        <p className='note'>Lưu ý : Nhập chính xác số tiền <b>{PaymentResponse.amount}</b> khi chuyển khoản</p>

                    </div>
                </div>
            </div>
        </>
    );


}
export default Checkout;