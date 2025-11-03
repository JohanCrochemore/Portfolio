import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },                   // Titre du post
  content: { type: String, required: true },                 // Contenu du blog
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  publishDate: { type: Date, default: Date.now },            // Date de publication
  relatedProject: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
}, { timestamps: true });

export default mongoose.model('BlogPost', BlogPostSchema);
