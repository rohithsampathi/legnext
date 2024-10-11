// components/Modal.js
import React from 'react';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button onClick={onClose} className="text-gray-700 hover:text-gray-900">
            &times;
          </button>
        </div>
        <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">{children}</div>
        <div className="flex justify-end p-4 border-t">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
