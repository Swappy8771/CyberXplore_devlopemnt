const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const fileRoutes = require('./routes/fileRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use('/upload', express.static('uploads'));
app.use(express.json());

// Routes
app.use('/', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
