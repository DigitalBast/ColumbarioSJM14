import React from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative max-w-4xl max-h-full">
        <img src={imageUrl} alt="Full resolution" className="max-w-full max-h-[90vh] object-contain" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-200 transition duration-300"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;