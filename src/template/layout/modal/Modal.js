import React from 'react';
import './Modal.css';
import { Dna } from 'react-loader-spinner'

function Modal({loading}) {
    
        return (
            <>
                 <div className='modal-loading' style={{ display: loading ? 'flex' : 'none' }}>
                    {loading && <Dna  visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper"/>}
    
                </div>
            </>
        );
    
    
}
export default Modal;