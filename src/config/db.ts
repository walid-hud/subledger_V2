import mongoose from 'mongoose';
import { wrap } from '../utils/try.js';

export const connectDB = async () => {
  const [data, error] = await wrap(mongoose.connect(process.env.MONGO_URI!));
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log('MongoDB connected');
};
