import  { useState } from 'react';
import Upload from './pages/UploadPage';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [view, setView] = useState<'upload' | 'dashboard'>('upload');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Secure File Upload & Malware Scanner
      </h1>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setView('upload')}
          className={`px-4 py-2 rounded ${view === 'upload' ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
        >
          Upload
        </button>
        <button
          onClick={() => setView('dashboard')}
          className={`px-4 py-2 rounded ${view === 'dashboard' ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
        >
          Dashboard
        </button>
      </div>

      {view === 'upload' ? <Upload /> : <Dashboard />}
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
