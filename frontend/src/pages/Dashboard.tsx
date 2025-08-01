import React, { useEffect, useState } from 'react';
import api from '../services/api';
import type { FileItem } from '../types/File';
import FileDetailsModal from '../components/FileDetailsModal';

const ITEMS_PER_PAGE = 10;

const Dashboard: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'clean' | 'infected'>('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get('/files');
      setFiles(res.data.files || []);
    };
    fetch();
    const interval = setInterval(fetch, 5000);
    return () => clearInterval(interval);
  }, []);

  const filtered = files.filter((f) =>
    filter === 'all' ? true :
    filter === 'pending' ? f.status === 'pending' :
    f.result === filter
  );

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const badge = (text: string | null, color: string) => (
    <span className={`text-xs px-2 py-1 rounded ${color}`}>{text || 'pending'}</span>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Malware Scan Dashboard</h2>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {['all', 'pending', 'clean', 'infected'].map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f as any);
              setPage(1); 
            }}
            className={`px-4 py-2 rounded capitalize transition-all ${
              filter === f
                ? {
                    all: 'bg-blue-600 text-white',
                    pending: 'bg-yellow-500 text-white',
                    clean: 'bg-green-600 text-white',
                    infected: 'bg-red-600 text-white',
                  }[f]
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white text-sm shadow rounded-lg">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              {['Filename', 'Status', 'Result', 'Uploaded At', 'Scanned At', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-2 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((file) => (
              <tr key={file.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{file.filename}</td>
                <td className="px-4 py-2">
                  {badge(file.status, file.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800')}
                </td>
                <td className="px-4 py-2">
                  {badge(file.result, file.result === 'clean'
                    ? 'bg-green-100 text-green-800'
                    : file.result === 'infected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800')}
                </td>
                <td className="px-4 py-2">{new Date(file.uploadedAt).toLocaleString()}</td>
                <td className="px-4 py-2">{file.scannedAt ? new Date(file.scannedAt).toLocaleString() : '—'}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedFile(file)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {!paginated.length && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">No matching files found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => setPage(pg)}
              className={`px-3 py-1.5 rounded-md border ${
                pg === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {pg}
            </button>
          ))}
        </div>
      )}

     {selectedFile && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
    <div className="absolute inset-0" onClick={() => setSelectedFile(null)} />
    <FileDetailsModal file={selectedFile} onClose={() => setSelectedFile(null)} />
  </div>
)}
    </div>
  );
};

export default Dashboard;
