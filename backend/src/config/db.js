import mongoose from 'mongoose';

export let dbConnected = false;

const localFallbackUri = 'mongodb://127.0.0.1:27017/team-task-manager';

const connectWithUri = async (uri) => {
  const conn = await mongoose.connect(uri);
  return conn;
};

export const connectDB = async () => {
  try {
    const primaryUri = process.env.MONGO_URI;

    if (!primaryUri || primaryUri.includes('<db_password>')) {
      await connectWithUri(localFallbackUri);
      dbConnected = true;
      console.log('MongoDB Connected Successfully (local fallback)');
      return;
    }

    await connectWithUri(primaryUri);
    dbConnected = true;
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    try {
      await connectWithUri(localFallbackUri);
      dbConnected = true;
      console.warn(`Primary MongoDB connection failed (${error.message}). Using local fallback.`);
      console.log('MongoDB Connected Successfully (local fallback)');
    } catch (fallbackError) {
      dbConnected = false;
      console.error('Database connection failed:', fallbackError.message);
    }
  }
};