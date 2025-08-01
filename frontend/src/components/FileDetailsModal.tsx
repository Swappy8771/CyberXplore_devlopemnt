import React from 'react';
import type { FileItem } from '../types/File';

interface Props {
  file: FileItem | null;
  onClose: () => void;
}

const FileDetailsModal: React.FC<Props> = ({ file, onClose }) => {
  if (!file) return null;

  const getBadgeStyle = (type: string | null) => {
    switch (type) {
      case 'clean':
        return 'bg-green-100 text-green-800';
      case 'infected':
        return 'bg-red-100 text-red-800';
      case 'scanned':
        return 'bg-green-100 text-green-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="relative z-50 bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative animate-fade-in">
        <button
          className="absolute top-2 right-3 text-gray-600 text-xl hover:text-gray-800"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h3 className="text-xl font-semibold mb-4 text-blue-700">File Details</h3>

        <div className="space-y-2 text-sm text-gray-800">
          <p><strong>Filename:</strong> {file.filename}</p>
          <p className="flex gap-2 items-center">
            <strong>Status:</strong>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getBadgeStyle(file.status)}`}>
              {file.status}
            </span>
          </p>
          <p className="flex gap-2 items-center">
            <strong>Result:</strong>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getBadgeStyle(file.result)}`}>
              {file.result || 'pending'}
            </span>
          </p>
          <p><strong>Uploaded At:</strong> {new Date(file.uploadedAt).toLocaleString()}</p>
          <p><strong>Scanned At:</strong> {file.scannedAt ? new Date(file.scannedAt).toLocaleString() : '—'}</p>
          {file.path && <p><strong>File Path:</strong> {file.path}</p>}
          {file.id && <p><strong>ID:</strong> {file.id}</p>}
        </div>
      </div>
    </div>
  );
};

export default FileDetailsModal;
