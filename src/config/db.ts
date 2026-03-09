import mongoose from 'mongoose';
import { wrap } from '../utils/try.js';
import { da } from 'zod/locales';

export const connectDB = async () => {
  const [data, error] = await wrap(mongoose.connect(process.env.MONGO_URI!));
  if (error) {
    console.error(error);
    process.exit(1);
  }
  data.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
  console.log('MongoDB connected');
};
