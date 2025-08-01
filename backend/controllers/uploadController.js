const File = require('../models/File');
const sendToQueue = require('../services/queueService');

// POST /upload
const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    // Handle missing file
    if (!file) {
      return res.status(400).json({ message: '❌ No file uploaded' });
    }

    // Create MongoDB record
    const newFile = new File({
      filename: file.originalname,
      path: file.path,
      status: 'pending',
      uploadedAt: new Date(),
      scannedAt: null,
      result: null,
    });

    // Save to DB
    await newFile.save();

    console.log(`✅ File uploaded: ${newFile.filename}`);

    // Push job to RabbitMQ queue
    await sendToQueue({
      fileId: newFile._id,
      filename: newFile.filename,
      path: newFile.path,
    });

    return res.status(201).json({
      message: '✅ File uploaded and queued for scanning',
      file: {
        id: newFile._id,
        filename: newFile.filename,
        status: newFile.status,
        uploadedAt: newFile.uploadedAt,
      },
    });
  } catch (err) {
    console.error('❌ Upload error:', err.message);
    res.status(500).json({ message: '❌ Upload failed, please try again' });
  }
};

// GET /files
const getAllFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });

    return res.status(200).json({
      total: files.length,
      files: files.map(file => ({
        id: file._id,
        filename: file.filename,
        status: file.status,
        result: file.result,
        uploadedAt: file.uploadedAt,
        scannedAt: file.scannedAt,
      }))
    });
  } catch (err) {
    console.error('❌ Failed to fetch files:', err.message);
    res.status(500).json({ message: '❌ Could not retrieve file list' });
  }
};

module.exports = { uploadFile, getAllFiles };
