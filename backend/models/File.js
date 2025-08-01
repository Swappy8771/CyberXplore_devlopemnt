const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  status: { type: String, default: 'pending' },
  uploadedAt: { type: Date, default: Date.now },
  scannedAt: { type: Date, default: null },
  result: { type: String, default: null },
});

module.exports = mongoose.model('File', fileSchema);
