import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },                     // Titre du projet
  description: { type: String, required: true },               // Description détaillée
  imageUrl: { type: String },                                   // Image page accueil
  homepageTitle: { type: String },                              // Titre page d’accueil
  homepageDescription: { type: String },                        // Description page d’accueil
  links: {
    github: { type: String },
    website: { type: String },
    docs: [{ type: String }]
  },
  status: { type: String, enum: ['in_progress', 'finished', 'published'], default: 'in_progress' },
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },
  relatedBlogPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }]
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);
