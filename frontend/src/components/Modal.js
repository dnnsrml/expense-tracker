import React from "react";

// Modal Component
const Modal = ({ isVisible, onClose, children }) => {
  return (
    <div
      className={`modal-background ${isVisible ? "modal-visible" : ""}`}
      // Removed onClick handler from the background
    >
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
