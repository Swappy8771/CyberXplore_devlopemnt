# 🛡️ Secure File Upload & Malware Scanning System


This is a full-stack application that allows users to upload files which are then scanned in the background for malware. Results are shown in a clean dashboard UI.

## 💻 Tech Stack

- **Frontend**: React + TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js, MongoDB, Multer
- **Worker Queue**: RabbitMQ + amqplib

## 🚀 Features

- File upload to `/uploads`
- MongoDB stores metadata and scan results
- Background malware scan via RabbitMQ worker
- Real-time dashboard with result filters and pagination
- View file details in modal popup

## 🛠️ Setup Instructions

### 🔧 Backend
```bash
cd backend
npm install
npm start

cd backend
npm run worker

🌐 Frontend
cd frontend
npm install
npm run dev

### 6. **Usage Instructions**
```md
## 📌 Usage

- Go to `/upload` to upload a file.
- View all uploaded files in `/` dashboard.
- Files are scanned in background every few seconds.
- "Clean" or "Infected" result appears after scan completes.


## 🧑‍💻 Developer Scripts

### Backend
- `npm start` – Run API server
- `npm run worker` – Run background scanner

### Frontend
- `npm run dev` – Start React with Vite


## 👨‍💻 Author

- Swapnil Patil | Full Stack Developer


