// Modal.js
import React from 'react';
import './Modal.css'; // Tạo một file CSS để tạo kiểu cho modal

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}

export default Modal;
