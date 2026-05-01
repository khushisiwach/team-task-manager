import mongoose from 'mongoose';

export let dbConnected = false;

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing');
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    dbConnected = true;
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    dbConnected = false;
    console.error('Database connection failed:', error.message);
    // Do not exit the process here — allow the server to start for local development.
    // Routes should respond with an appropriate HTTP status when DB operations fail.
  }
};