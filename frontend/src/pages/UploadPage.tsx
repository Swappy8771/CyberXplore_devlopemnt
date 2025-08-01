import React from 'react';
import FileUpload from '../components/FileUpload';

const Upload: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">Upload a File</h2>
      <FileUpload />
    </div>
  );
};

export default Upload;
