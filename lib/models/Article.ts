import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: String,
  name: String,
  slug: String
});

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'draft'
  },
  readTime: {
    type: Number,
    required: true,
    min: 1
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
articleSchema.index({ status: 1, publishedAt: -1 });
articleSchema.index({ category: 1 });
articleSchema.index({ featured: 1 });
articleSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export const Article = mongoose.models.Articles || mongoose.model('Article', articleSchema);