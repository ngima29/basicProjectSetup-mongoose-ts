import mongoose, { Schema } from 'mongoose';
import { ArticleInterface } from '../interfaces';

const articleSchema = new Schema<ArticleInterface>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    image: {type: String},
    author: { type: String, required: true },
    content: { type: String, required: true },
    publishDate: { type: Date, required: true },
    tags: { type: [String], required: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);
export const ArticleModel =  mongoose.model<ArticleInterface>('Article', articleSchema);
