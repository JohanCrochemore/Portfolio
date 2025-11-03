import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },          // Nom complet
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'visitor'], default: 'visitor' },
  profileDescription: { type: String },
  cvLink: { type: String },                        // URL vers le CV
  skills: [{ type: String }],                      // Liste de compétences
}, { timestamps: true });                           // createdAt / updatedAt

export default mongoose.model('User', UserSchema);
