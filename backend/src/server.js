import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const ports = [5002, 5003, 5004];
let currentPortIndex = 0;

const startServer = async () => {
  await connectDB();

  if (currentPortIndex < ports.length) {
    const port = ports[currentPortIndex];
    
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying next port...`);
        currentPortIndex++;
        server.close();
        startServer();
      }
    });
  } else {
    console.error('All ports are busy');
    process.exit(1);
  }
};

startServer().catch((error) => {
  console.error(error.message);
  process.exit(1);
});