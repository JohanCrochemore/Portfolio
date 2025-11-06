import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },                   
  urlImage: { type: String},                 
}, { timestamps: true });

export default mongoose.model('Skills', SkillSchema);
