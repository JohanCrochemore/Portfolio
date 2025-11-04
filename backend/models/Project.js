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
  isAccueil: { type: Boolean, default: false },
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },
  relatedBlogPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }]
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);
