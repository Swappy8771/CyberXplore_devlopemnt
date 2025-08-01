// services/scannerService.js
const fs = require('fs').promises;
const pathModule = require('path');
const pdfParse = require('pdf-parse');
const File = require('../models/File');
const keywords = require('../shared/keywords');

const simulateMalwareScan = async ({ fileId, path }) => {
  try {
    console.log(`🧪 Scanning file: ${path}`);

    // Simulate delay (2–5 seconds)
    const delay = Math.floor(Math.random() * 3000) + 2000;
    await new Promise((res) => setTimeout(res, delay));

    // Determine file type
    const ext = pathModule.extname(path).toLowerCase();

    let content = '';

    if (ext === '.pdf') {
      const buffer = await fs.readFile(path);
      const data = await pdfParse(buffer);
      content = data.text;
    } else {
      content = await fs.readFile(path, 'utf-8');
    }

    // Keyword check (case-insensitive)
    const contentLower = content.toLowerCase();
    const isInfected = keywords.some(word => contentLower.includes(word.toLowerCase()));

    const result = isInfected ? 'infected' : 'clean';

    // Update DB
    await File.findByIdAndUpdate(fileId, {
      status: 'scanned',
      scannedAt: new Date(),
      result,
    });

    console.log(`✅ File scanned: ${path} → ${result.toUpperCase()}`);
  } catch (error) {
    console.error('❌ Error during scan:', error.message);
  }
};

module.exports = simulateMalwareScan;
