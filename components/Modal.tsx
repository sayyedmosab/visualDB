import React, { useEffect, useState } from 'react';
import { X, Copy } from 'lucide-react';
import Prism from 'prismjs';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small timeout to allow the DOM to update before highlighting
      setTimeout(() => Prism.highlightAll(), 0);
    }
  }, [isOpen, content]);

  if (!isOpen) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <div className="flex items-center space-x-4">
            <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors flex items-center">
              {copied ? <span className="text-green-400">Copied!</span> : <><Copy className="w-5 h-5 mr-2" /> Copy</>}
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="p-2 bg-gray-900 overflow-auto flex-grow rounded-b-lg">
          <pre className="language-sql h-full !bg-gray-900">
            <code className="language-sql">{content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Modal;