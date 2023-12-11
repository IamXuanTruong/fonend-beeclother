import React  from 'react';
import Footer from "./footer/Footer";
import Header from "./header/Header";
import  Modal from "./modal/Modal";


function MasterLayout({ Page }) {

    return (
        <>
            <Header />
            {Page}
            <Footer />
            <Modal />
        </>
    );
}

export default MasterLayout;