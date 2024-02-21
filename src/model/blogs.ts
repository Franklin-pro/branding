import { NextFunction } from 'express';
import mongoose, { Document, Model } from 'mongoose';

// Define interface for the blog document
interface IBlog extends Document {
  blogTitle: string;
  blogDescription: string;
  blogImage: string;
  CreatedDate: Date;
  Likes: number; // Change the type to number
  disLikes: mongoose.Types.ObjectId[]; 
}

// Define blog schema
const blogsSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    required: true
  },
  blogDescription: {
    type: String,
    required: true
  },
  blogImage: {
    type: String,
    required: true
  },
  CreatedDate: {
    type: Date,
    default: Date.now
  },
  Likes: {
    type: Number, // Change the type to Number
    default: 0 // Set default value to 0
  },
  disLikes: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER"
  }]
});

// Define Blogs model
const Blogs: Model<IBlog> = mongoose.model<IBlog>("Blogs", blogsSchema);

export { Blogs };
