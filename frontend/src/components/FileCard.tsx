import React from 'react';
import type { FileItem } from '../types/File';

const FileCard: React.FC<{ file: FileItem }> = ({ file }) => {
  const getStatusColor = () => {
    if (file.status === 'pending') return 'bg-yellow-200 text-yellow-800';
    if (file.result === 'clean') return 'bg-green-200 text-green-800';
    if (file.result === 'infected') return 'bg-red-200 text-red-800';
    return '';
  };

  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-gray-800">{file.filename}</h4>
        <span className={`text-xs px-2 py-1 rounded ${getStatusColor()}`}>
          {file.status === 'pending' ? 'Pending' : file.result}
        </span>
      </div>
      <p className="text-xs text-gray-600">Uploaded: {new Date(file.uploadedAt).toLocaleString()}</p>
      {file.scannedAt && (
        <p className="text-xs text-gray-600">Scanned: {new Date(file.scannedAt).toLocaleString()}</p>
      )}
    </div>
  );
};

export default FileCard;
