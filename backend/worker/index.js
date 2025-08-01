// worker/index.js
require('dotenv').config();
const amqp = require('amqplib');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const simulateMalwareScan = require('../services/scannerService');

const QUEUE_NAME = 'file_scan_queue';

const startWorker = async () => {
  await connectDB();

  try {
    const conn = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await conn.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log('👷 Worker is listening for jobs...');

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        const jobData = JSON.parse(msg.content.toString());

        await simulateMalwareScan(jobData);

        channel.ack(msg); // Mark job as done
      }
    });
  } catch (err) {
    console.error('❌ Worker error:', err.message);
    process.exit(1);
  }
};

startWorker();
