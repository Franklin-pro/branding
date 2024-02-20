import { NextFunction } from 'express';
import mongoose, { Document, Model, Query } from 'mongoose';

// Define interface for the blog document
interface IBlog extends Document {
  blogTitle: string;
  blogDescription: string;
  blogImage: string;
  CreatedDate: Date;
  Likes: mongoose.Types.ObjectId[];
  DisLikes: mongoose.Types.ObjectId[];
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
  Likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER"
  }],
  DisLikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER"
  }]
});

// Define middleware for populating comments before any find operation
// blogsSchema.pre('find', function(this: Query<any, IBlog>, next: NextFunction) {
//     this.populate({
//       path: "Comment",
//       select: "Comment PostedDate"
//     });
//     next(); // Assuming this middleware doesn't handle errors, passing them to the next middleware
//   });
  
  

// Define Blogs model
const Blogs: Model<IBlog> = mongoose.model<IBlog>("Blogs", blogsSchema);

export { Blogs };
