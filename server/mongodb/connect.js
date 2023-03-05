import mongoose from 'mongoose';

const connectDB = (url) => {
  mongoose.set('strictQuery', true); // for search

  mongoose
    .connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error: ', err));
};

export default connectDB;
