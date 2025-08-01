// services/queueService.js
const amqp = require('amqplib');

const QUEUE_NAME = 'file_scan_queue';

const sendToQueue = async (data) => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    channel.sendToQueue(
      QUEUE_NAME,
      Buffer.from(JSON.stringify(data)),
      { persistent: true }
    );

    console.log(`📨 Job queued: ${data.filename}`);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('❌ Failed to send job to RabbitMQ:', error.message);
  }
};

module.exports = sendToQueue;
