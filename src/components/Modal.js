import React from "react";

const Modal = ({url}) => (

    <div className="modal-wrapper">
        <div className="modal-container">
            <img className="modal-image" src={url} alt=""/> 
        </div>
        <div className="modal-close-btn">&times;</div>
    </div>
);

export default Modal;
