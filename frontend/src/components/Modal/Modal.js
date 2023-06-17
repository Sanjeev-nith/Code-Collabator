import React from 'react';
import './Modal.css';

const Modal = ({ setShowLoginModal, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <>
        <section className="modal-main">
            {children}
        </section>
        <div className={showHideClassName} onClick={() => setShowLoginModal(false)}></div>
      </>
    );
  };

export default Modal;